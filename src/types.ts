export interface StageInformation {
  pictures: {
    bare: string;
    complete: string;
  }
  region: Region;
  monthlyConsumptionKwh: number; // watts
  panelCount: number;
  offset: number; // decimal to 2 points
}

export interface CurrentStep {
  picture: string;
  region: Region | null;
  monthlyConsumptionKwh: number | null;
  panelCount: number;
  offset: number | null;
}

export interface Guess {
  value: null | number;
  type: 'High' | 'Low' | 'Correct' | 'Missing';
}

export type Region = "Southeast"
export type Step = 0 | 1 | 2 | 3 | 4;