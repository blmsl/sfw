import { IUser } from './user/user.interface';

export interface ITask {
  id?: string;

  title: string;
  description: string;
  type: string;

  colour?: string;
  priority?: string;

  progress: number;

  creationAt: any;
  creationBy: string;

  assignedUser?: IUser | IUser[];
}
