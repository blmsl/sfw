import { ITraining } from '../training.interface';
import { ITeamManagement } from './team-management.interface';
import { ICompetition } from './competition.interface';
import { ITimeLineEvent } from '../time-line-event.interface';
import { IStanding } from './standings.interface';

export interface ITeam {

  id?: string;
  isImported?: boolean;

  title: string;
  subTitle?: string;

  info?: string;

  externalTeamLink?: string;
  logoURL?: string;
  isOfficialTeam: boolean;
  isMainTeam?: boolean;

  photoDescription?: string;

  assignedClub?: string;
  assignedTeamCategories: string[];
  assignedSeason: string;

  assignedPlayers: string[];
  assignedPositions: ITeamManagement[];
  assignedTrainings: ITraining[];

  assignedCompetitions?: ICompetition[];
  assignedEvents?: ITimeLineEvent[];
  currentStandings?: IStanding[];

  creationAt: any;
  creationBy: string;
}
