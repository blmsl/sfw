import { IAddress } from '../location/address.interface';
import { IContact } from '../contact.interface';
import { IProfile } from './profile.interface';
import { IClubData } from './club-data.interface';
import { IClubDFBData } from './club-dfb-data.interface';
import { IClubAHData } from './club-ah-data.interface';
import { IInterview } from './interview.interface';
import { IOpinion } from './opinion.interface';

export interface IMember {
  id?: string;

  title?: string;

  driveImport: boolean;
  dfbImport: boolean;

  ahStatus?:number;
  clubStatus?: number;
  assignedClub?: string;

  mainData: IMemberMainData;
  address?: IAddress;
  contact?: IContact;
  clubData?: IClubData;
  ahData?: IClubAHData;
  dfbData?: IClubDFBData;
  profile?: IProfile[];
  otherData?: IMemberOtherData;

  creationAt: any;
  creationBy: string;

  interview?: IInterview[];
  comment?: string;

  assignedInterviews?: IInterview[];
  honoraryDate?: {
    seconds: number;
    nanoseconds: number;
  };
  honoraryArticle?: string;

  opinions?: IOpinion[];
}

export interface IMemberMainData {
  title?: string;     //
  gender: string;     //
  firstName?: string; //
  lastName?: string;  //
  birthday: {
    year: string;
    month: string;
    day: string;
    monthDay: string;
    full: string;
  };   //
}

export interface IMemberOtherData {
  info?: string;
}
