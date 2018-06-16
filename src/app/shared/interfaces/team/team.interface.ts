import { ICreation } from '../creation.interface';
import { IMember } from '../member/member.interface';
import { ITraining } from '../training.interface';
import { ITeamManagement } from './team-management.interface';
import { ICompetition } from './competition.interface';
import { ITimeLineEvent } from '../time-line-event.interface';
import { IClub } from '../club/club.interface';

export interface ITeam {

  id?: string;
  title: string;
  subTitle?: string;
  externalTeamLink?: string;
  isOfficialTeam: boolean;
  logoURL?: string;

  photoURL?: string;
  photoDescription?: string;

  assignedClub?: IClub;
  assignedTeamCategories: string[];
  assignedSeason: string;

  assignedPlayers: IMember[];
  assignedPositions: ITeamManagement[];
  assignedTrainings: ITraining[];
  assignedCompetitions: ICompetition[];
  assignedEvents: ITimeLineEvent[];

  // teamOfTheMonth?: IHighlightedItem[];

  creation: ICreation;
}
