import { ICreation } from './creation.interface';
import { ICategory } from './category.interface';

export interface ISponsor {

  id?: string;
  title: string;
  internalInfo: string;
  description: string;

  externalLink?: string;

  startDate?: {
    seconds: number,
    nanoseconds: number
  };
  endDate?: {
    seconds: number,
    nanoseconds: number
  };

  assignedCategories: string[];
  creation?: ICreation;
  // publication?: IPublication;
}
