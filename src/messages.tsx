import React from "react";
import styled from "styled-components";
import { GAME_LENGTH } from "./constants";
import { Button } from "./controls/Button";
import { Guess } from "./types";
import { copyTextToClipboard, makeArrayLength } from "./util";

const ButtonRow = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 4px;
`;

function buildCopyString(guesses: Guess[]) {
  const isWinner =
    guesses.length > 0 && guesses[guesses.length - 1].type === "Correct";
  const adjustedGuesses = makeArrayLength(guesses);

  return `#Solardle 1 ${isWinner ? guesses.length : "X"}/${GAME_LENGTH}
${adjustedGuesses
  .map((guess) => {
    if (guess === null) {
      return "⬜";
    }
    switch (guess.type) {
      case "Correct":
        return "🟩";
      case "Missing":
        return "🔲";
      case "High":
        return "⤵️";
      case "Low":
        return "⤴️";
    }
  })
  .join("")}`;
}

export interface WelcomeToSolardleProps {
  onFancyMode: () => void;
  onClose: () => void;
}

export function WelcomeToSolardle({
  onFancyMode,
  onClose,
}: WelcomeToSolardleProps) {
  return (
    <div>
      <h3>How to Play</h3>
      <p>Guess the number of panels needed to get to 100% offset.</p>
      <p>Every guess is either marked as too high or too low. Have fun!</p>
      <ButtonRow>
        <Button onClick={onClose} type="submit">
          Okay!
        </Button>
        {/* <Button onClick={onFancyMode} type="button">
          Fancy Controls
        </Button> */}
      </ButtonRow>
    </div>
  );
}

export interface YouWinMessageProps {
  guesses: Guess[];
  onClose: () => void;
}

export function YouWinMessage({ guesses, onClose }: YouWinMessageProps) {
  return (
    <div>
      <h3>You win!</h3>
      <p>You're a real solar professional.</p>
      <ButtonRow>
        <Button onClick={onClose} type="submit">
          Okay!
        </Button>
        <Button
          onClick={() => {
            copyTextToClipboard(buildCopyString(guesses));
          }}
          type="button"
        >
          Copy Game
        </Button>
      </ButtonRow>
    </div>
  );
}
export interface OutOfGuessesProps {
  answer: number;
  onClose: () => void;
  guesses: Guess[];
}

export function OutOfGuesses({ answer, onClose, guesses }: OutOfGuessesProps) {
  return (
    <div>
      <h3>Out of guesses</h3>
      <p>You're out of guesses. The correct answer was {answer}.</p>
      <ButtonRow>
        <Button onClick={onClose} type="submit">
          Okay!
        </Button>
        <Button
          onClick={() => {
            copyTextToClipboard(buildCopyString(guesses));
          }}
          type="button"
        >
          Copy Game
        </Button>
      </ButtonRow>
    </div>
  );
}
