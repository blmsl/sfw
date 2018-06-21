import { ICreation } from '../creation.interface';
import { ICategory } from '../category.interface';
import { ILocationContact } from './location-contact.interface';
import { IAddress } from './address.interface';
import { IPublication } from '../publication.interface';

export interface ILocation {
  id?: string;
  isImported: boolean;
  title: string;
  text: string;

  assignedCategory?: string | ICategory;
  assignedContacts?: ILocationContact[];

  fupaLink?: string;

  opening?: string;
  prices?: string;

  creation: ICreation;
  publication?: IPublication;

  address?: IAddress;
}
