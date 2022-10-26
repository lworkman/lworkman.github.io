import React from "react";
import styled from "styled-components";

export const StyledSvg = styled.svg`
  fill: currentColor;
  width: 24px;
  margin-left: 4px;
  &[data-flipped="true"] {
    transform: rotate(180deg) scaleX(-1);
  }
`;

export interface ArrowIncreaseProps {
  flip?: boolean;
}

export function ArrowIncrease({ flip }: ArrowIncreaseProps) {
  return (
    <StyledSvg viewBox="0 0 24 16" data-flipped={flip}>
      <g transform="matrix(0.265379, 0, 0, 0.265379, 0.318393, -3.582806)">
        <polygon
          points="5.61,73.92 0,68.32 38.03,30.29 54.11,46.36 77.14,23.33 82.75,28.93 54.11,57.58 38.03,41.5 "
          transform="  matrix(1 0 0 1 0 0) "
        ></polygon>
        <polygon
          points="70.91,21.19 90,16.07 84.89,35.16 "
          transform="  matrix(1 0 0 1 0 0) "
        ></polygon>
      </g>
    </StyledSvg>
  );
}
