import React from "react";
import styled from "styled-components";
import { Guess } from "../types";
import { makeArrayLength } from "../util";
import { ArrowIncrease } from "./ArrowHigher";
import { Checkmark } from "./CheckMark";
import { Cursor } from "./Cursor";
import { GuessSquare } from "./GuessSquare";

const GuessContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: none;
  overflow-x: auto;
  justify-content: center;
`;

const typeToBadgeSettings: Record<
  Guess["type"],
  {
    backgroundColor: string;
    gem: JSX.Element | null;
  }
> = {
  Correct: {
    backgroundColor: "#388e3c",
    gem: <Checkmark />,
  },
  High: {
    backgroundColor: "#d32f2f",
    gem: <ArrowIncrease flip />,
  },
  Low: {
    backgroundColor: "#d32f2f",
    gem: <ArrowIncrease />,
  },
  Missing: {
    backgroundColor: "#616161",
    gem: null,
  },
};

function formatValue(value: number | null): string {
  return value === null ? "? ? ?" : value.toLocaleString();
}

export interface GuessRowProps {
  currentValue: number | null;
  guesses: Guess[];
  disabled: boolean;
}

export function GuessRow({ guesses, currentValue, disabled }: GuessRowProps) {
  const elements = makeArrayLength(guesses).map((item, i, arr) => {
    const key = `guess-${i}`;
    if (item) {
      const { backgroundColor, gem } = typeToBadgeSettings[item.type];
      return (
        <GuessSquare
          style={{
            backgroundColor,
            color: "white",
          }}
          key={key}
          isGuess
        >
          {formatValue(item.value)}
          {gem}
        </GuessSquare>
      );
    }
    if (!disabled && !item && (arr[i - 1] || i === 0)) {
      return (
        <GuessSquare key={key}>
          {currentValue}
          <Cursor />
        </GuessSquare>
      );
    }
    return <GuessSquare key={key}>&nbsp;</GuessSquare>;
  });

  return <GuessContainer>{elements}</GuessContainer>;
}
