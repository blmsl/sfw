import { ICreation } from './creation.interface';
import { ICategory } from './category.interface';

export interface ISponsor {

  id?: string;
  title: string;
  internalInfo: string;
  description: string;

  imageUrl?: string;
  assignedMediaItem?: string;

  externalLink?: string;

  startDate?: Date;
  endDate?: Date;

  assignedCategories: string[];
  creation?: ICreation;
  // publication?: IPublication;
}
