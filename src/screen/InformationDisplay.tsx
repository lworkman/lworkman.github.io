import React, { ReactNode } from "react";
import { Region } from "../types";
import styled from "styled-components";
import { PictureWithFade } from "./PictureWithFade";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const InformationBar = styled.div`
  flex: 0 0 auto;
  background-color: white;
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 16px;
  padding-left: var(--screen-padding);
  padding-right: var(--screen-padding);
`;

const InformationPointContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

interface InformationPointProps {
  value: string | number | null;
  label: string;
  unit?: string;
}

function InformationPoint({ value, label, unit }: InformationPointProps) {
  return (
    <InformationPointContainer>
      <span>{label}:</span>
      <span style={{whiteSpace: 'nowrap'}}>{valueOrPlaceholder(value)} &nbsp;{unit}</span>
    </InformationPointContainer>
  );
}

function valueOrPlaceholder(value: string | number | null): string {
  return value ? value.toString() : "??";
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
      <PictureWithFade src={picture} />
      <InformationBar>
        <InformationPoint label="Region" value={region} />
        <InformationPoint label="Consumption" value={monthlyConsumptionKwh} unit="kWh" />
        <InformationPoint label="Offset" value={offset} />
      </InformationBar>
    </Container>
  );
}
