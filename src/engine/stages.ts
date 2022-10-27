import { CurrentStep, StageInformation, Step } from "../types";

const stages: StageInformation[] = [
  {
    panelCount: 18,
    monthlyConsumptionKwh: 608,
    pictures: {
      bare: new URL("./stage-pictures/bare-min.png", import.meta.url).href,
      complete: new URL("./stage-pictures/complete-min.png", import.meta.url)
        .href,
    },
    region: "Southeast",
  },
];

export function stageToStep(
  stage: StageInformation,
  isFinished?: boolean
): CurrentStep {
  return {
    ...stage,
    picture: isFinished ? stage.pictures.complete : stage.pictures.bare,
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
