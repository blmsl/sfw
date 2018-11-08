import { ILocationContact } from './location-contact.interface';
import { IAddress } from './address.interface';

export interface ILocation {
  id?: string;
  isImported: boolean;
  title: string;
  text: string;

  assignedCategory?: string;
  assignedContacts?: ILocationContact[];

  fupaLink?: string;

  opening?: string;
  prices?: string;

  creationAt: any;
  creationBy: string;
  publicationAt?: any;
  publicationStatus?: number;
  publicationBy?: string;

  address?: IAddress;
}
