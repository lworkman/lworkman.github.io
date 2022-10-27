import React from "react";
import { Region } from "../types";
import styled from "styled-components";
import { PictureWithFade } from "./PictureWithFade";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 8px;
`;

const InformationBar = styled.div`
  flex: 0 0 auto;
  background-color: white;
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-left: var(--screen-padding);
  padding-right: var(--screen-padding);
  padding-bottom: 8px;
`;

const InformationPointContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

interface InformationPointProps {
  value: string | number;
  label: string;
}

function InformationPoint({ value, label }: InformationPointProps) {
  return (
    <InformationPointContainer>
      <span>{label}:</span>
      <span style={{ whiteSpace: "nowrap" }}>{value}</span>
    </InformationPointContainer>
  );
}

function toKwh(value: number): string {
  return `${value} kWh`;
}

export interface InformationDisplayProps {
  picture: string;
  region: Region;
  monthlyConsumptionKwh: number;
}

export function InformationDisplay({
  picture,
  region,
  monthlyConsumptionKwh,
}: InformationDisplayProps) {
  return (
    <Container>
      <InformationBar>
        <InformationPoint label="Region" value={region} />
        <InformationPoint
          label="Energy Use"
          value={toKwh(monthlyConsumptionKwh)}
        />
      </InformationBar>
      <PictureWithFade src={picture} />
    </Container>
  );
}
