import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import {
  map,
  switchMap,
  take
} from 'rxjs/operators';
import { IMember } from '../../interfaces/member/member.interface';
import { ICalendarEvent } from '../../interfaces/calendar/calendar-event.interface';
import { MemberService } from '../member/member.service';
import { Observable } from 'rxjs';
import { ApplicationService } from '../application/application.service';

@Injectable()
export class CalendarService {

  private url: string = 'https://europe-west1-sf-winterbach.cloudfunctions.net/googleCalendar';

  constructor(private httpClient: HttpClient,
    private applicationService: ApplicationService,
    private memberService: MemberService) {
  }

  public getCalendars(): Observable<ICalendarEvent[]> {
    return this.httpClient.get(this.url).pipe(
      map((events: ICalendarEvent[]) => {
        return events;
      })
    );
  }

  public getMemberBirthdays(): Observable<ICalendarEvent[]> {
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
