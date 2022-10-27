import React from "react";
import styled from "styled-components";
import { PANEL_SIZE_PMAX } from "../constants";
import { Cursor } from "./Cursor";

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

const MainValue = styled.span``;
const Estimate = styled.span`
  font-size: 0.7em;
`;

function calculateSystemSize(count: number | null): string | null {
  if (count === null) {
    return "???";
  }

  return (Math.round((count * PANEL_SIZE_PMAX) / 10) / 100).toLocaleString();
}

export interface CurrentValueProps {
  value: number | null;
}

export function CurrentValue({ value }: CurrentValueProps) {
  return (
    <Container>
      <MainValue>
        {value}
        <Cursor />
      </MainValue>
      <Estimate>Estimated Size: {calculateSystemSize(value)} kW</Estimate>
    </Container>
  );
}
