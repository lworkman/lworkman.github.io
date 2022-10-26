import { GAME_LENGTH } from "../constants";
import { Guess, StageInformation, Step } from "../types";

interface GameStateBase {
  readonly stage: StageInformation;
  guesses: Guess[];
  isDone: boolean;
}

export interface GameState extends GameStateBase {
  isDone: false;
}

export interface FinishedGameState extends GameStateBase {
  isDone: true;
}

export type GameStateUnion = GameState | FinishedGameState;

function cloneGameState(state: GameState): GameState {
  return {
    ...state,
    guesses: [...state.guesses],
  };
}

export class GameEngine {
  static makeGuess(
    value: number | null,
    state: GameState
  ): GameStateUnion {
    const output: GameState = cloneGameState(state);
    const answer = state.stage.panelCount;
    let isCorrect = false;

    if (value === state.stage.panelCount) {
      isCorrect = true;
      output.guesses.push({
        type: "Correct",
        value,
      });
    } else if (value === null) {
      output.guesses.push({
        type: "Missing",
        value,
      });
    } else if (value < answer) {
      output.guesses.push({
        type: "Low",
        value,
      });
    } else if (value > answer) {
      output.guesses.push({
        type: "High",
        value,
      });
    }

    if (output.guesses.length === GAME_LENGTH || isCorrect) {
      return {
        ...output,
        isDone: true,
      };
    } else {
      return output;
    }
  }
}
