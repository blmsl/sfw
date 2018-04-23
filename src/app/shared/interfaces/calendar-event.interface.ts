import { Moment } from 'moment';

export interface ICalendarEvent {
  created?: Moment;
  creator?: {
    email: string;
    displayName: string;
  }
  end?: string;
  etag?: string;
  htmlLink?: string;
  iCaluUID?: string;
  id?: string;
  kind?: string;
  location?: string;
  organizer?: {
    email: string;
    displayName: string;
    self: boolean;
  };
  sequence?: number;
  start: {
    dateTime: string;
  };
  status?: string;
  summary?: string;
  title: string;
  updated?: Moment;
}
