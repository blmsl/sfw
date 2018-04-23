import { IUser } from './user.interface';

export interface IPublication {
  status: number;
  date: string;
  time: string;
  from?: IUser | string;
}
