import { ICategoryType } from './category-type.interface';

export interface ICategory {
  id?: string;
  title: string;
  description: string;
  isImported: boolean;
  assignedCategoryType?: ICategoryType | string;
  creationAt: any;
  creationBy: string;
}
