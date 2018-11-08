import * as firebase from 'firebase';
import { IMatchEvent } from './match-event.interface';
import { IStartingPosition } from './starting-position.interface';

export interface IMatch {

  id?: string;

  assignedLinks?: {
    title: string;
    link: string;
  }[];

  assignedCategories: string[];

  assignedMatchEvents?: IMatchEvent[];
  assignedFormation?: string;

  startingEleven?: IStartingPosition[];

  assignedSubstitutes?: string[];

  assignedLocation: string;
  assignedTeam: string;

  creationAt: any;
  creationBy: string;

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

  result?: {
    otherEvent?: number | string;
    homeTeamGoals?: number | string;
    guestTeamGoals?: number | string;
  };

  title: string;
}
