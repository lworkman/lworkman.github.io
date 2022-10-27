import { CurrentStep, StageInformation, Step } from "../types";

const stages: StageInformation[] = [
  {
    panelCount: 15,
    monthlyConsumptionKwh: 608,
    pictures: {
      bare: new URL("./stage-pictures/bare.png", import.meta.url).href,
      withObstructions: new URL(
        "./stage-pictures/with_obstructions.png",
        import.meta.url
      ).href,
      withRoof: new URL("./stage-pictures/roof.png", import.meta.url).href,
      complete: new URL("./stage-pictures/complete.png", import.meta.url).href,
    },
    region: "Southeast",
    offset: 1,
  },
];

export function stageToStep(stage: StageInformation, step: Step): CurrentStep {
  switch (step) {
    case 0:
      return {
        panelCount: stage.panelCount,
        monthlyConsumptionKwh: null,
        picture: stage.pictures.bare,
        region: null,
        offset: null,
      };
    case 1:
      return {
        panelCount: stage.panelCount,
        monthlyConsumptionKwh: stage.monthlyConsumptionKwh,
        picture: stage.pictures.bare,
        region: stage.region,
        offset: null,
      };
    case 2:
      return {
        panelCount: stage.panelCount,
        monthlyConsumptionKwh: stage.monthlyConsumptionKwh,
        picture: stage.pictures.bare,
        region: stage.region,
        offset: null,
      };
    case 3:
      return {
        panelCount: stage.panelCount,
        monthlyConsumptionKwh: stage.monthlyConsumptionKwh,
        picture: stage.pictures.bare,
        region: stage.region,
        offset: null,
      };
    case 4:
      return {
        panelCount: stage.panelCount,
        monthlyConsumptionKwh: stage.monthlyConsumptionKwh,
        picture: stage.pictures.bare,
        region: stage.region,
        offset: stage.offset,
      };
  }
}

export function finishedStageToStep(stage: StageInformation): CurrentStep {
  return {
    ...stage,
    picture: stage.pictures.complete,
  };
}

const baseTime = 1666805561524;

export function timeToStage(time: number) {
  if (baseTime < time) {
    return stages[0];
  }

  // normally here we would translate the time to some sort offset. For now we only have one stage.

  return stages[0];
}
