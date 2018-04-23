export interface IMatch {

  id?: string;

  homeTeam: {
    logoURL: string;
    externalTeamLink: string;
    title: string;
  };
  guestTeam: {
    logoURL: string;
    externalTeamLink: string;
    title: string;
  };

  isImported: boolean;
  isOfficialMatch: boolean;
  isHomeTeam: boolean;
  assignedTeamCategory: string;

  matchType?: string;
  endDate: Date;
  matchLink: string;
  startDate: Date;

  result?: {
    otherEvent: string;
    homeTeamGoals: number | '';
    guestTeamGoals: number | '';
  };

  fadeOutAnimation?: boolean;
}
