export interface IMatch {

  id?: string;

  assignedCategories: {
    assignedCategory: string;
    assignedLocationCategory: string;
    assignedMainCategory: string;
  };

  assignedLocation: string;
  assignedTeam: string;

  guestTeam: {
    logoURL: string;
    externalTeamLink: string;
    title: string;
  };

  homeTeam: {
    logoURL: string;
    externalTeamLink: string;
    title: string;
  };

  isHomeTeam: boolean;
  isImported: boolean;
  isOfficialMatch: boolean;

  matchType?: string;
  matchLink: string;

  matchEndDate: {
    seconds: number;
    nanoseconds: number;
  };
  matchStartDate: {
    seconds: number;
    nanoseconds: number;
  };

  result?: {
    otherEvent: string;
    homeTeamGoals: number | '';
    guestTeamGoals: number | '';
  };

  title: string;
}
