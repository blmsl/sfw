import { IRole } from './role.interface';

export interface IUser {

  id?: string;

  emailVerified?: boolean;
  isDisabled?: boolean;

  email: string;
  password?: string;

  firstName?: string;
  lastName?: string;
  displayName?: string;
  gender?: string;

  assignedRoles: IRole;

  creationTime?: string;
  lastSignInTime?: string;
}
