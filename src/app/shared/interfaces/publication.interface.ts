import { IUser } from './user/user.interface';

export interface IPublication {
  status: number;
  dateTime?: any;
  from?: IUser | string;
}
