import { ICreation } from '../creation.interface';
import { IPublication } from '../publication.interface';
import * as firebase from 'firebase';
import { IMatchEvent } from './match-event.interface';

export interface IMatch {

  id?: string;

  assignedCategories: {
    assignedCategory: string;
    assignedMainCategory: string;
  };

  assignedEvents?: IMatchEvent[];
  assignedFormation?: string;

  assignedPlayers?: {
    memberId: string;
    position: string;
  }[];

  assignedSubstitutes?: string[];

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
