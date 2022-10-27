import React, { CSSProperties, ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const toState = {
  transform: "rotate3d(1, 0, 0, 90deg)",
};
const fromState = {
  transform: "rotate3d(1, 0, 0, -90deg)",
};
const staticState = {
  transform: "rotate3d(0, 0, 0, 0deg)",
};

const GuessSpace = styled(motion.div)`
  display: flex;
  align-items: center;
  background-color: #e0e0e0;
  padding: 4px 6px;
  text-align: center;
  min-width: 66px;
  border-radius: 6px;
  justify-content: center;
  color: black;
  font-size: 24px;
`;

export interface GuessSquareProps {
  children?: ReactNode;
  isGuess?: boolean;
  style?: CSSProperties
}

export function GuessSquare({ children, isGuess, style }: GuessSquareProps) {
  return (
    <AnimatePresence mode="wait">
      <GuessSpace style={style} key={(!!isGuess).toString()} initial={fromState} animate={staticState} exit={toState} transition={{
        duration: 0.3
      }}>
        {children}
      </GuessSpace>
    </AnimatePresence>
  );
}
