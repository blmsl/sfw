import { ICreation } from '../creation.interface';
import { IMember } from '../member/member.interface';
import { ITraining } from '../training.interface';
import { ITeamManagement } from './team-management.interface';
import { ICompetition } from './competition.interface';
import { ITimeLineEvent } from '../time-line-event.interface';
import { IClub } from '../club/club.interface';
import { IStanding } from './standings.interface';

export interface ITeam {

  id?: string;
  title: string;
  subTitle?: string;

  externalTeamLink?: string;
  isOfficialTeam: boolean;
  isMainTeam?: boolean;

  photoDescription?: string;

  assignedClub?: IClub;
  assignedTeamCategories: string[];
  assignedSeason: string;

  assignedPlayers: string[];
  assignedPositions: ITeamManagement[];
  assignedTrainings: ITraining[];


  assignedCompetitions?: ICompetition[];
  assignedEvents?: ITimeLineEvent[];
  currentStandings?: IStanding[];

  // teamOfTheMonth?: IHighlightedItem[];

  creation: ICreation;
}
