import { ICreation } from './creation.interface';
import { IUser }     from './user/user.interface';

export interface ITask {
  id?: string;

  title: string;
  description: string;
  type: string;

  colour?: string;
  priority?: string;

  progress: number;

  creation: ICreation;
  assignedUser?: IUser | IUser[];
}
