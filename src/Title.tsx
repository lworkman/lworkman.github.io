import React from "react";
import styled from "styled-components";
import { Button } from "./controls/Button";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  position: relative;
  margin-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;

  h1 {
    margin: 0;
    padding: 0;
  }
`;

const RightAligned = styled.div`
  position: absolute;
  right: 12px;
`;

export interface TitleProps {
  onHelp: () => void;
}

export function Title({ onHelp }: TitleProps) {
  return (
    <TitleContainer>
      <h1>Solardle</h1>
      <RightAligned>
        <Button onClick={onHelp} type="button">
          ?
        </Button>
      </RightAligned>
    </TitleContainer>
  );
}
