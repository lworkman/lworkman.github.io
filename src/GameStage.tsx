import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { GameControl } from "./controls/GameControl";
import { GameEngine, GameStateUnion } from "./engine/GameEngine";
import { InformationDisplay } from "./screen/InformationDisplay";
import { finishedStageToStep, stageToStep, timeToStage } from "./engine/stages";
import { Step } from "./types";

const StageContainer = styled.div`
  display: flex;
  flex: 1 0 800px;
  flex-direction: column;
  height: 100%;
`;

export function GameStage() {
  const stage = timeToStage(Date.now());

  const [value, setValue] = useState<number | null>(null);
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
    setValue(null);
    setGameState(GameEngine.makeGuess(value, gameState));
  };

  const skip = () => guess(null);

  return (
    <StageContainer>
      <InformationDisplay {...stageStep} />
      <GameControl
        currentValue={value}
        guesses={gameState.guesses}
        setCurrentValue={setValue}
        onGuess={guess}
        onSkip={skip}
        disabled={gameState.isDone}
      />
    </StageContainer>
  );
}
