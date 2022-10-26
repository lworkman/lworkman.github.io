import React from "react";
import styled from "styled-components";

const StyledSvg = styled.svg`
  fill: currentColor;
  width: 24px;
  margin-left: 4px;
  &[data-flipped="true"] {
    transform: rotate(180deg) scaleX(-1);
  }
`;

export function Checkmark() {
  return (
    <StyledSvg viewBox="0.294 0.469 19.63 15.288" width="20" height="16">
      <path d="M 19.924 1.871 L 7.754 15.757 L 0.294 9.194 L 1.732 7.569 L 7.557 12.679 L 18.316 0.469 L 19.924 1.871 Z"></path>
    </StyledSvg>
  );
}
