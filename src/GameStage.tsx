import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GameControl } from "./controls/GameControl";
import { GameEngine, GameStateUnion } from "./engine/GameEngine";
import { InformationDisplay } from "./screen/InformationDisplay";
import { finishedStageToStep, stageToStep, timeToStage } from "./engine/stages";
import { Step } from "./types";
import { Modal } from "./Modal";
import { Title } from "./Title";
import { OutOfGuesses, WelcomeToSolardle, YouWinMessage } from "./messages";

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
  const [gameState, setGameState] = useState<GameStateUnion>({
    guesses: [],
    isDone: false,
    stage,
  });
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const [fancyMode, setFancyMode] = useState(false);

  const stageStep = gameState.isDone
    ? finishedStageToStep(stage)
    : stageToStep(stage, gameState.guesses.length as Step);

  const guess = (value: number | null) => {
    if (gameState.isDone) {
      return;
    }
    const newState = GameEngine.makeGuess(value, gameState);

    if (
      newState.isDone &&
      newState.guesses[newState.guesses.length - 1].type === "Correct"
    ) {
      setModalContent(
        <YouWinMessage
          guesses={newState.guesses}
          onClose={() => setModalContent(null)}
        />
      );
    } else if (newState.isDone) {
      setModalContent(
        <OutOfGuesses
          answer={newState.stage.panelCount}
          onClose={() => setModalContent(null)}
          guesses={newState.guesses}
        />
      );
    } else {
      setCurrentGuess(null);
    }
    setGameState(GameEngine.makeGuess(value, gameState));
  };

  const openHelp = () =>
    setModalContent(
      <WelcomeToSolardle
        onFancyMode={() => setFancyMode((val) => !val)}
        onClose={() => setModalContent(null)}
      />
    );

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
          disabled={gameState.isDone}
          useKnob={fancyMode}
        />
        {modalContent ? (
          <Modal onClose={() => setModalContent(null)}>{modalContent}</Modal>
        ) : null}
      </StageContainer>
    </>
  );
}
