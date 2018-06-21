import { IAddress } from './address.interface';
import { IContact } from '../contact.interface';

export interface ILocationContact {

  isMember: boolean;
  description: string;

  assignedMember?: string;

  firstName?: string;
  lastName?: string;

  contact?: IContact;
  address?: IAddress;
}
