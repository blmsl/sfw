import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import {
  switchMap,
  take
} from 'rxjs/operators';
import { IMember } from '../../interfaces/member/member.interface';
import { ICalendarEvent } from '../../interfaces/calendar/calendar-event.interface';
import { MemberService } from '../member/member.service';
import { Observable } from 'rxjs';
import { ApplicationService } from '../application/application.service';
import { AngularFireFunctions } from '@angular/fire/functions';

@Injectable()
export class CalendarService {

  constructor(private httpClient: HttpClient,
    private applicationService: ApplicationService,
    private fns: AngularFireFunctions,
    private memberService: MemberService) {
  }

  public getCalendars() {
    return this.fns.httpsCallable('googleCalendar')({}).toPromise();
  }

  public getMemberBirthdays(): Observable<ICalendarEvent[]> {
    return this.memberService.members$.pipe(
      switchMap((members: IMember[]) => {

        let events: ICalendarEvent[] = [];

        for (let i = 0; i < members.length; i++) {
          if (members[i].mainData.birthday) {
            const event: ICalendarEvent = {
              title: 'Geburtstag von ' + members[i].mainData.firstName + ' ' + members[i].mainData.lastName + ' (' + this.memberService.calculateAge(members[i].mainData.birthday.full) + ' Jahre)',
              start: moment(members[i].mainData.birthday.full).set('year', moment().year()).format('YYYY-MM-DD')
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
