import React, { ReactNode } from "react";
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
  value: string | number | null;
  label: string;
}

function InformationPoint({ value, label }: InformationPointProps) {
  return (
    <InformationPointContainer>
      <span>{label}:</span>
      <span style={{ whiteSpace: "nowrap" }}>{valueOrPlaceholder(value)}</span>
    </InformationPointContainer>
  );
}

function valueOrPlaceholder(value: string | number | null): string {
  return value ? value.toString() : "??";
}

function toPercent(value: number | null): string {
  return `${value === null ? "?? " : value * 100}%`;
}

function toKwh(value: number | null): string {
  return `${value === null ? "??" : value} kWh`;
}

export interface InformationDisplayProps {
  picture: string;
  region: Region | null;
  offset: number | null;
  monthlyConsumptionKwh: number | null;
}

export function InformationDisplay({
  picture,
  region,
  offset,
  monthlyConsumptionKwh,
}: InformationDisplayProps) {
  return (
    <Container>
      <InformationBar>
        <InformationPoint label="Region" value={region} />
        <InformationPoint
          label="Consumption"
          value={toKwh(monthlyConsumptionKwh)}
        />
      </InformationBar>
      <PictureWithFade src={picture} />
    </Container>
  );
}
