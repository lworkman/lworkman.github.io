export interface StageInformation {
  pictures: {
    bare: string;
    complete: string;
  }
  region: Region;
  monthlyConsumptionKwh: number;
  panelCount: number;
}

export interface CurrentStep {
  picture: string;
  region: Region;
  monthlyConsumptionKwh: number;
  panelCount: number;
}

export interface Guess {
  value: null | number;
  type: 'High' | 'Low' | 'Correct' | 'Missing';
}

export type Region = "Southeast"
export type Step = 0 | 1 | 2 | 3 | 4;