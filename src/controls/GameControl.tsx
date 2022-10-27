import React from "react";
import styled from "styled-components";
import { Guess } from "../types";
import { CurrentValue } from "./CurrentValue";
import { GuessRow } from "./GuessRow";
import { Knob } from "./Knob";
import { NumberPad } from "./NumberPad";

const GameControlContainer = styled.div`
  display: flex;
  flex: 0;
  flex-direction: column;
  padding-left: var(--screen-padding);
  padding-right: var(--screen-padding);
  gap: 8px;
  margin-bottom: 8px;
  align-items: center;
`;

interface GameControlProps {
  guesses: Guess[];
  currentValue: number | null;
  setCurrentValue: (value: number | null) => void;
  onGuess: (value: number | null) => void;
  disabled?: boolean;
  useKnob: boolean;
}

export function GameControl({
  guesses,
  currentValue,
  setCurrentValue,
  onGuess,
  disabled,
  useKnob,
}: GameControlProps) {
  return (
    <GameControlContainer>
      <GuessRow
        currentValue={currentValue}
        disabled={!!disabled}
        guesses={guesses}
      />
      <CurrentValue value={currentValue} disabled={disabled} />
      {useKnob ? (
        <Knob onChange={setCurrentValue} />
      ) : (
        <NumberPad
          disabled={disabled}
          onChange={setCurrentValue}
          value={currentValue}
          onGuess={onGuess}
        />
      )}
    </GameControlContainer>
  );
}
