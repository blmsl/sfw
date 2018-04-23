import { IMember } from './member.interface';

export interface IOpinion {
  comment: string;
  type: string;
  name: string;
  assignedMember: IMember;
}
