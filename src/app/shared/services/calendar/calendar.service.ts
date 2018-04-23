import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable()
export class CalendarService {

  private url: string;

  constructor(private http: HttpClient) {
    const timeMin = moment().subtract('6', 'months').toISOString();
    const timeMax = moment().add('1', 'years').endOf('year').toISOString();
    this.url = 'https://www.googleapis.com/calendar/v3/calendars/' + environment.googleCalendar.id + '/events?timeMin=' + timeMin + '&timeMax=' + timeMax; // + ' &key=' + environment;
  }

  getCalendarEvents(): Observable<any> {
    return this.http.get(this.url);
  }

}
