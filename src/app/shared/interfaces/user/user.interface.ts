import { ICreation } from '../creation.interface';
import { IRole } from './role.interface';

export interface IUser {
  id?: string;
  emailVerified?: boolean;
  password?: string;
  providerId?: string;

  isDisabled?: boolean;

  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  photoURL?: string;

  onlineStatus?: string;
  assignedRoles?: IRole;
  // assignedMember?: IMember | string;

  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };

  creation?: ICreation;
}
