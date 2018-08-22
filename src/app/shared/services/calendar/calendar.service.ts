import { Injectable }           from '@angular/core';
import { HttpClient }           from '@angular/common/http';
import * as moment              from 'moment';
import { map, switchMap, take } from 'rxjs/operators';
import { IMember }              from '../../interfaces/member/member.interface';
import { ICalendarEvent }       from '../../interfaces/calendar-event.interface';
import { MemberService }        from '../member/member.service';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable()
export class CalendarService {

  private url: string;

  constructor(private http: HttpClient,
    private memberService: MemberService) {
  }

  getCalendars(calendarIds: string[]){

    if (!calendarIds || calendarIds.length === 0) {
      return of([]);
    }

    const _this = this;

    let calendarObservables: Observable<any>[] = [];
    Object.keys(calendarIds).forEach(function (key) {
      console.log(calendarIds[key]);
      calendarObservables.push(_this.getCalendarEvents(calendarIds[key]));
    });

    return forkJoin(calendarObservables);
  }

  getCalendarEvents(calendarUrl: string): any {
    return this.http.get('https://www.googleapis.com/calendar/v3/calendars/' + calendarUrl).pipe(
      map((calEvents: any) => {
        console.log(calEvents);
        return calEvents;
      })
    );
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
