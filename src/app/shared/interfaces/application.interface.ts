import { IRole } from './user/role.interface';
import { IStaticPage } from './static-page.interface';
import { ISocialNetwork } from './social-network.interface';

export interface IApplication {
  id?: string;

  assignedCalendars?: {
    link: string;
    title: string;
  }[];

  page: {
    isEnabled: boolean;
    name: string;
    title?: string;
    description?: string;
    email?: string;
  };

  urlShortening: {
    title: string,
    key: string
  } | number;

  registration: string | IRole;

  downtime: {
    isEnabled: boolean;
    message?: string;
  };

  mailing?: {
    birthdayRecipients: string[];
    teamOfTheMonth: string[];
    memberOfTheWeek: string[];
    newPublishedArticle: string[];
    newCreatedMatch: string[];
  };

  staticPages: IStaticPage[];
  social: ISocialNetwork[];
}
