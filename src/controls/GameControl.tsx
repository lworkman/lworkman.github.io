import React, { useState } from "react";
import styled from "styled-components";
import { PANEL_SIZE_PMAX } from "../constants";
import { GuessRow } from "./GuessRow";
import { NumberPad } from "./NumberPad";
import { Guess } from "../types";

const GameControlContainer = styled.div`
  display: flex;
  flex: 0;
  flex-direction: column;
  padding-left: var(--screen-padding);
  padding-right: var(--screen-padding);
`;

function calculateOutputInMonthlyKwh(count: number | null): string | null {
  if (count === null) {
    return "???";
  }

  return (Math.round((count * PANEL_SIZE_PMAX) / 10) / 100).toLocaleString();
}

interface GameControlProps {
  guesses: Guess[];
  currentValue: number | null;
  setCurrentValue: (value: number | null) => void;
  onSkip: () => void;
  onGuess: (value: number | null) => void;
  disabled?: boolean;
}

export function GameControl({
  guesses,
  currentValue,
  setCurrentValue,
  onGuess,
  onSkip,
  disabled
}: GameControlProps) {
  return (
    <GameControlContainer>
      <GuessRow
        guesses={guesses}
      />
      <div>Size: {calculateOutputInMonthlyKwh(currentValue)} kW</div>
      <NumberPad disabled={disabled} onChange={setCurrentValue} value={currentValue} />
      <div>
        <button disabled={disabled} onClick={onSkip}>Skip</button>
        <button disabled={disabled} onClick={() => onGuess(currentValue)}>Guess</button>
      </div>
    </GameControlContainer>
  );
}
