import styled, { keyframes } from "styled-components";

const cursorBlink = keyframes`
0% {
  opacity: 0;
}
50% {
  opacity: 1;
}
100% {
    opacity: 0;
}
`;

export const Cursor = styled.span`
  border-left: 1px solid black;
  animation: ${cursorBlink} 1s steps(1, jump-start) infinite;
  height: 1em;
`;
