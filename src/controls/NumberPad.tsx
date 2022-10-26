import React from "react";
import styled, { keyframes } from "styled-components";

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
`;

const NumberPadGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 300px;
  gap: 12px;
`;

const NumberButton = styled.button`
  border: none;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: black;
  background-color: white;

  &:hover {
    background-color: #e0e0e0;
  }
  &:active {
    background-color: #9e9e9e;
  }
  &:disabled {
    opacity: 0.5;
    cursor: inherit;
  }
`;

const cursorBlink = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
      opacity: 0;
  }
`;

const Cursor = styled.span`
  border-left: 1px solid black;
  animation: ${cursorBlink} 1s steps(1, jump-start) infinite;
  height: 1em;
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
        >
          7
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 8))}
        >
          8
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 9))}
        >
          9
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 4))}
        >
          4
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 5))}
        >
          5
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 6))}
        >
          6
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 1))}
        >
          1
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 2))}
        >
          2
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 3))}
        >
          3
        </NumberButton>
        <div />
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(addDigit(value, 0))}
        >
          0
        </NumberButton>
        <NumberButton
          disabled={disabled}
          onClick={() => onChange(removeDigit(value))}
        >
          ⬅️
        </NumberButton>
      </NumberPadGrid>
    </NumberPadContainer>
  );
}
