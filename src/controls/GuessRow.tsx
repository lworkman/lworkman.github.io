import React from "react";
import styled from "styled-components";
import { Guess } from "../types";
import { ArrowIncrease } from "./ArrowHigher";
import { Checkmark } from "./CheckMark";

const GUESS_COUNT = 5;

const GuessContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: none;
  overflow-x: auto;
  justify-content: center;
`;

const GuessSpace = styled.div`
  background-color: #e0e0e0;
  padding: 4px 6px;
  text-align: center;
  color: white;
  min-width: 60px;
  border-radius: 6px;
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

interface GuessComponentProps {
  guess: Guess | null;
}

function GuessComponent({ guess }: GuessComponentProps) {
  if (guess === null) {
    return (
      <GuessSpace>
        &nbsp;
      </GuessSpace>
    );
  }

  const { backgroundColor, gem } = typeToBadgeSettings[guess.type];

  return (
    <GuessSpace
      style={{
        backgroundColor,
      }}
    >
      {formatValue(guess.value)}
      {gem}
    </GuessSpace>
  );
}

function makeArrayLength<ArrayType>(arr: ArrayType[]): (ArrayType | null)[] {
  const hack = [...arr];
  hack.length = GUESS_COUNT;

  return Array.from(hack, (val) => val ?? null);
}

export interface GuessRowProps {
  guesses: Guess[];
}

export function GuessRow({ guesses }: GuessRowProps) {
  const elements = makeArrayLength(guesses).map((item, i) => {
    return <GuessComponent key={`guess-${i}`} guess={item} />;
  });

  return <GuessContainer>{elements}</GuessContainer>;
}
