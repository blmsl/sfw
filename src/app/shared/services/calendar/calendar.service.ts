import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { switchMap, take, map } from 'rxjs/internal/operators';
import { IMember } from '../../interfaces/member/member.interface';
import { ICalendarEvent } from '../../interfaces/calendar-event.interface';
import { MemberService } from '../member/member.service';
import 'rxjs/add/operator/map';

@Injectable()
export class CalendarService {

  private url: string;

  constructor(private http: HttpClient,
              private memberService: MemberService) {
    const timeMin = moment().subtract('6', 'months').toISOString();
    const timeMax = moment().add('1', 'years').endOf('year').toISOString();
    this.url = 'https://www.googleapis.com/calendar/v3/calendars/' + environment.googleCalendar.id + '/events?timeMin=' + timeMin + '&timeMax=' + timeMax; // + ' &key=' + environment;
  }

  getCalendarEvents(): any {
    return this.http.get(this.url).map((calEvents: any) => {
        console.log(calEvents);
        return calEvents;

        /* calEvents.items.forEach((event: ICalendarEvent) => {
          const startDate = event.start.dateTime.substr(0, 10);
          const calendarEvent: any = {
            title: event.summary,
            start: startDate
          };
          this.events$.push(calendarEvent);
        });
        return this.events$; */
      });
  }

  getMemberBirthdays(): Observable<ICalendarEvent[]> {
    return this.memberService.members$.pipe(
      switchMap((members: IMember[]) => {

        let events: ICalendarEvent[] = [];

        for (let i = 0; i < members.length; i++) {
          if (members[i].mainData.birthday) {
            const event: ICalendarEvent = {
              title: 'Geburtstag von ' + members[i].mainData.firstName + ' ' + members[i].mainData.lastName + ' (' + this.memberService.calculateAge(members[i].mainData.birthday) + ' Jahre)',
              start: moment(members[i].mainData.birthday).set('year', moment().year()).format('YYYY-MM-DD')
            };
            events.push(event);
          }
        }
        return [events];
      }),
      take(1)
    );
  }

}
