import { ICreation } from './creation.interface';

export interface ICategoryType {
  id?: string;
  title: string;
  creation: ICreation;
  icon?: string;
  link?: string;
}
