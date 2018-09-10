import { ICoord } from './coord.interface';

export interface IFormation {
  mainFormation: number;
  maxSubstitutes: number;
  positionList?: ICoord[];
  title: string;
}
