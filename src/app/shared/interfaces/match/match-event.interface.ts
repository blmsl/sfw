import { ICategory } from '../category.interface';

export interface IMatchEvent {
  assignedCategory?: ICategory;
  description: string;
  playMinute?: number;
  title: string;

  playerOne: string;
  playerTwo: string;
}
