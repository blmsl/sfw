import { IRole }           from './user/role.interface';
import { IStaticPage }     from './static-page.interface';
import { ISocialNetwork }  from './social-network.interface';
import { IGoogleCalendar } from './calendar/google-calendar.interface';
import { IMailList }       from './mail-list.interface';

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

  registration: string | IRole;

  downtime: {
    isEnabled: boolean;
    message?: string;
  };

  mailing?: IMailList[];

  staticPages: IStaticPage[];
  social: ISocialNetwork[];
}
