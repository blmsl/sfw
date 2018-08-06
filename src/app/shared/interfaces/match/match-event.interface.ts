import { ICategory } from '../category.interface';

export interface IMatchEvent {
  assignedEventCategory?: ICategory;
  description: string;
  playMinute?: number;
  title: string;
}
