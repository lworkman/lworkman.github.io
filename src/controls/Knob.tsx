import React, { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";

const STEP_SIZE = 15; // how many deg per value

function throttle(callback, ms) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let nextArgs;

  return (...args) => {
    nextArgs = args;

    if (timer !== null) {
      return;
    }

    timer = setTimeout(() => {
      callback(...nextArgs);
      timer = null;
    }, ms);
  };
}

function listenForPointerAngle(
  element: HTMLDivElement,
  onChange: (value: number) => void
) {
  element.addEventListener("pointerdown", (event) => {
    event.stopPropagation();

    const bounding = element.getBoundingClientRect();

    const center: Position = {
      x: bounding.left + bounding.width / 2,
      y: bounding.top + bounding.height / 2,
    };

    function handleMovement(event: PointerEvent) {
      event.preventDefault();
      const newValue = angleBetweenPosition(center, {
        x: event.pageX,
        y: event.pageY,
      });
      onChange(newValue + 90);
    }

    function cleanup() {
      window.removeEventListener("pointermove", handleMovement);
      window.removeEventListener("pointerup", cleanup);
    }
    window.addEventListener("pointermove", handleMovement);
    window.addEventListener("pointerup", cleanup);
  });
}

interface Position {
  x: number;
  y: number;
}

const KnobControl = styled.div`
  background-color: black;
  height: 100%;
  width: 100%;
  border-radius: 100%;
  border: 2px solid white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
`;

const DropShadowBackground = styled.div`
  height: 175px;
  width: 175px;
  margin-bottom: 12px;
  box-shadow: 5px 12px 21px 5px #000000;
  border-radius: 100%;
  overflow: hidden;
`;

const Nubbin = styled.div`
  border-radius: 100%;
  background-color: black;
  border: 2px solid white;
  position: absolute;
  top: 12px;
  width: 20px;
  height: 20px;
  touch-action: none;
`;

function angleBetweenPosition(pos1: Position, pos2: Position): number {
  return Math.round(
    (Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x) * 180) / Math.PI
  );
}

function valueToDeg(value: number): number {
  return value * STEP_SIZE;
}

function degToValue(deg: number): number {
  return Math.floor((deg * -1) / STEP_SIZE);
}

function flipAngle(value: number): number {
  return value * -1 + 180;
}

export interface KnobProps {
  onChange: (value: number) => void;
}

export function Knob({ onChange }: KnobProps) {
  // Start slightly off center
  const normalRotation = useRef(-45);
  const summedRotation = useRef(0);

  const [rotation, setRotation] = useState(normalRotation.current);

  const throttleSetValue = useMemo(
    () =>
      throttle((newDeg: number) => {
        const oldDeg = normalRotation.current;
        let difference = normalRotation.current - newDeg;

        // Large differences come from the angle "flipping"
        if (Math.abs(difference) > 170) {
          if (oldDeg < 0) {
            difference = flipAngle(oldDeg) - newDeg;
          } else {
            difference = oldDeg - flipAngle(newDeg);
          }
        }

        const newSummedRotation = summedRotation.current + difference;
        const value = degToValue(newSummedRotation);

        if (value > 99 || value < 0) {
          return;
        }
        onChange(degToValue(newSummedRotation));

        summedRotation.current = newSummedRotation;
        normalRotation.current = newDeg;

        setRotation(newDeg);
      }, 14),
    [onChange, setRotation]
  );

  const mountKnob = useCallback(
    function mountKnob(element: null | HTMLDivElement) {
      if (element === null) {
        return;
      }
      listenForPointerAngle(element, throttleSetValue);
    },
    [throttleSetValue]
  );

  return (
    <DropShadowBackground>
      <KnobControl
        ref={mountKnob}
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <Nubbin />
      </KnobControl>
    </DropShadowBackground>
  );
}
