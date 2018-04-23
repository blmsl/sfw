import { IMember } from '../member/member.interface';
import { IArticle } from '../article.interface';

export interface IClubHonorary {
  assignedArticle?: IArticle | string;
  assignedMember?: IMember | string;
  startDate: Date;
}
