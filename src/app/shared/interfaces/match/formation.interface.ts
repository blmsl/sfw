export interface IFormation {
  mainFormation: number;
  maxSubstitutes: number;
  positionList?: {
    x: number;
    y: number;
  }[];
  title: string;
}
