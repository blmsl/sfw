import { IClubManagement } from './club-management.interface';
import { IClubHonorary } from './club-honorary.interface';
import { IAddress } from '../location/address.interface';
import { ITimeLineEvent } from '../time-line-event.interface';

export interface IClub {

  id?: string;

  title: string;
  description?: string;
  history?: string;
  logoURL?: string;
  address?: IAddress;

  fussballde: {
    clubId?: string;
    clubUrl?: string;
  };

  assignedLocation: string;

  timeLine: ITimeLineEvent[];

  info: {
    founding?: string;
    clubColours?: string;
    assignedContact?: string;
    website?: string;
  };

  honoraries: IClubHonorary[];

  management: {
    positions: IClubManagement[];
    photoUrl?: string;
    photoDescription?: string;
    timeLine: ITimeLineEvent[];
  };

  creationAt: any;
  creationBy: string;
}
