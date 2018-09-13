import { IMember } from './member.interface';
import { ICreation } from '../creation.interface';

export interface IOpinion {
  comment: string;
  type: string;
  creation?: ICreation;
  name: {
    firstName: string;
    lastName: string;
  };
  assignedMember: IMember;
}
