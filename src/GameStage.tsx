import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GameControl } from "./controls/GameControl";
import { GameEngine, GameStateUnion } from "./engine/GameEngine";
import { InformationDisplay } from "./screen/InformationDisplay";
import { finishedStageToStep, stageToStep, timeToStage } from "./engine/stages";
import { Guess, Step } from "./types";
import { Modal } from "./Modal";
import { Title } from "./Title";

const testGuesses: Guess[] = [
  {
    type: "High",
    value: 99,
  },
  {
    type: "Low",
    value: 8,
  },
  {
    type: "Missing",
    value: null,
  },
  {
    type: "Correct",
    value: 15,
  },
];

function WelcomeToSolardle() {
  return (
    <div>
      <h3>How to Play</h3>
      <p>Guess the number of panels needed to get to 100% offset.</p>
      <p>
        More information is revealed with each guess:
      </p>
      <ul>
        <li>Where your guess is in relation to the answer</li>
        <li>The conditions of the roof</li>
      </ul>
    </div>
  );
}

function YouWinMessage() {
  return (
    <div>
      <h3>You win!</h3>
      <p>You're a real solar professional.</p>
    </div>
  );
}

interface OutOfGuessesProps {
  answer: number;
}

function OutOfGuesses({ answer }: OutOfGuessesProps) {
  return (
    <div>
      <h3>Out of guesses</h3>
      <p>You're out of guesses. The correct answer was {answer}.</p>
    </div>
  );
}

const StageContainer = styled.div`
  display: flex;
  flex: 1 1 500px;
  flex-direction: column;
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
`;

export function GameStage() {
  const stage = timeToStage(Date.now());

  const [currentGuess, setCurrentGuess] = useState<number | null>(null);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const [gameState, setGameState] = useState<GameStateUnion>({
    guesses: [],
    isDone: false,
    stage,
  });

  const stageStep = gameState.isDone
    ? finishedStageToStep(stage)
    : stageToStep(stage, gameState.guesses.length as Step);

  const guess = (value: number | null) => {
    if (gameState.isDone) {
      return;
    }
    setCurrentGuess(null);
    const newState = GameEngine.makeGuess(value, gameState);

    if (
      newState.isDone &&
      newState.guesses[newState.guesses.length - 1].type === "Correct"
    ) {
      setModalContent(<YouWinMessage />);
    } else if (newState.isDone) {
      setModalContent(<OutOfGuesses answer={newState.stage.panelCount} />);
    }
    setGameState(GameEngine.makeGuess(value, gameState));
  };

  const skip = () => guess(null);

  const openHelp = () => setModalContent(<WelcomeToSolardle />);

  // Add shortcut to close modal
  useEffect(() => {
    document.body.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setModalContent(null);
      }
    });
  }, []);

  return (
    <>
      <Title onHelp={openHelp} />
      <StageContainer>
        <InformationDisplay {...stageStep} />
        <GameControl
          currentValue={currentGuess}
          guesses={gameState.guesses}
          setCurrentValue={setCurrentGuess}
          onGuess={guess}
          onSkip={skip}
          disabled={gameState.isDone}
          onHelp={openHelp}
        />
        {modalContent ? (
          <Modal onClose={() => setModalContent(null)}>{modalContent}</Modal>
        ) : null}
      </StageContainer>
    </>
  );
}
