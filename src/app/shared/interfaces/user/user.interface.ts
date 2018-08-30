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

  assignedRoles?: IRole;
}
