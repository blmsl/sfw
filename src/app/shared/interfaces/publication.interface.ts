import { IUser } from './user/user.interface';

export interface IPublication {
  status: number;
  dateTime?: string;
  from?: IUser | string;
}
