import { IMember } from './member.interface';

export interface IOpinion {
  comment: string;
  type: string;
  name: {
    firstName: string;
    lastName: string;
  };
  assignedMember: IMember;
}
