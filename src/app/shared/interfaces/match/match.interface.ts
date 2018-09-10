import { ICreation }         from '../creation.interface';
import { IPublication }      from '../publication.interface';
import * as firebase         from 'firebase';
import { IMatchEvent }       from './match-event.interface';
import { ICoord }            from './coord.interface';
import { IStartingPosition } from './starting-position.interface';
import { IFormation }        from './formation.interface';

export interface IMatch {

  id?: string;

  assignedCategories: string[];

  assignedMatchEvents?: IMatchEvent[];
  assignedFormation?: IFormation;

  startingEleven?: IStartingPosition[];

  assignedSubstitutes?: {
    memberId: string;
    position: ICoord;
  }[];

  assignedLocation: string;
  assignedTeam: string;

  creation?: ICreation;

  guestTeam: {
    logoURL?: string;
    externalTeamLink?: string;
    title: string;
  };

  homeTeam: {
    logoURL?: string;
    externalTeamLink?: string;
    title: string;
  };

  isHomeTeam: boolean;
  isImported?: boolean;
  isOfficialMatch: boolean;

  matchType?: string;
  matchLink: string;

  matchEndDate: firebase.firestore.Timestamp;
  matchStartDate: firebase.firestore.Timestamp;

  publication?: IPublication;

  result?: {
    otherEvent?: number | string;
    homeTeamGoals?: number | string;
    guestTeamGoals?: number | string;
  };

  title: string;
}
