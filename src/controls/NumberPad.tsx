import React from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "./Button";
import { Cursor } from "./Cursor";

const MAX_GUESS = 99;

const NumberPadContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const CurrentAnswer = styled.p`
  font-size: 2em;
  height: 1em;
  margin-bottom: 12px;
  margin-top: unset;
`;

const NumberPadGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 300px;
  gap: 12px;
`;

const NumberButton = styled(Button)`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

function addDigit(value: number | null, digit: number): number {
  if (value === null) {
    return digit;
  }

  return Math.min(parseInt(`${value}${digit}`), MAX_GUESS);
}

function removeDigit(value: number | null): number | null {
  if (value === null) {
    return null;
  } else if (value < 10) {
    return null;
  }

  return parseInt(value.toString().slice(0, -1));
}

export interface NumberPadProps {
  value: number | null;
  onChange: (value: number | null) => void;
  disabled?: boolean;
}

export function NumberPad({ value, onChange, disabled }: NumberPadProps) {
  return (
    <NumberPadContainer>
      <CurrentAnswer>
        {value === null ? null : value.toLocaleString()}
        {!disabled ? <Cursor /> : null}
      </CurrentAnswer>
      <NumberPadGrid>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 7))}
          type="button"
        >
          7
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 8))}
          type="button"
        >
          8
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 9))}
          type="button"
        >
          9
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 4))}
          type="button"
        >
          4
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 5))}
          type="button"
        >
          5
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 6))}
          type="button"
        >
          6
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 1))}
          type="button"
        >
          1
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 2))}
          type="button"
        >
          2
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 3))}
          type="button"
        >
          3
        </NumberButton>
        <div />
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 0))}
          type="button"
        >
          0
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(removeDigit(value))}
          type="button"
        >
          ⬅️
        </NumberButton>
      </NumberPadGrid>
    </NumberPadContainer>
  );
}
