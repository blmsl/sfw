import { IStaticPage } from './static-page.interface';
import { ISocialPage } from './social-page.interface';
import { IGoogleCalendar } from './calendar/google-calendar.interface';
import { IMailList } from './mail-list.interface';
import { ISocialNetwork } from './social-network.interface';

export interface IApplication {
  id?: string;

  assignedCalendars?: IGoogleCalendar[];

  page: {
    isEnabled: boolean;
    name: string;
    title?: string;
    description?: string;
    email?: string;
    assignedKeywords?: string[];
  };

  urlShortening: {
    title: string,
    key: string
  } | number;

  registration: string;

  downtime: {
    isEnabled: boolean;
    message?: string;
  };

  mailing?: IMailList[];

  staticPages?: IStaticPage[];
  social?: ISocialPage[];
  socialNetworks?: ISocialNetwork[];

  signInProviders?: {
    title: string,
    isEnabled: boolean
  }[];
}
