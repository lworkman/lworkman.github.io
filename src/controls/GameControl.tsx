import React, { useState } from "react";
import styled from "styled-components";
import { PANEL_SIZE_PMAX } from "../constants";
import { GuessRow } from "./GuessRow";
import { NumberPad } from "./NumberPad";
import { Guess } from "../types";
import { Button } from "./Button";
import { Knob } from "./Knob";

const GameControlContainer = styled.div`
  display: flex;
  flex: 0;
  flex-direction: column;
  padding-left: var(--screen-padding);
  padding-right: var(--screen-padding);
  gap: 8px;
  margin-bottom: 8px;
`;

const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
`;

const SplitControls = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  gap: 12px;
`;

function calculateSystemSize(count: number | null): string | null {
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
  onHelp: () => void;
  disabled?: boolean;
}

export function GameControl({
  guesses,
  currentValue,
  setCurrentValue,
  onGuess,
  onSkip,
  disabled,
  onHelp
}: GameControlProps) {
  return (
    <GameControlContainer>
      <GuessRow guesses={guesses} />
      {/* <div>Size: {calculateOutputInMonthlyKwh(currentValue)} kW</div> */}
      {currentValue ?? "??"}
      <SplitControls>
        <Knob onChange={setCurrentValue} />
        {/* <NumberPad
          disabled={disabled}
          onChange={setCurrentValue}
          value={currentValue}
        /> */}
        <ButtonColumn>
          <Button
            disabled={disabled}
            onClick={() => onGuess(currentValue)}
            type="button"
          >
            Guess
          </Button>
          <Button disabled={disabled} onClick={onSkip} type="button">
            Skip
          </Button>
          <Button type="button" onClick={onHelp}>
            Help
          </Button>
        </ButtonColumn>
      </SplitControls>
    </GameControlContainer>
  );
}
