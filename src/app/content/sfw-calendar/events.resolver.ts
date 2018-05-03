import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ICalendarEvent } from '../../shared/interfaces/calendar-event.interface';
import { MemberService } from '../../shared/services/member/member.service';
import { IMember } from '../../shared/interfaces/member/member.interface';
import { CalendarService } from '../../shared/services/calendar/calendar.service';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators';

@Injectable()
export class EventsResolver implements Resolve<ICalendarEvent[]> {

  private events$: any[] = [];

  constructor(private memberService: MemberService,
    private calendarService: CalendarService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICalendarEvent[]> {

    console.log('Events-resolver: add match-fixtures to calendar');

    return this.memberService.members$.pipe(
      switchMap((members: IMember[]) => {

        const memberEvents: ICalendarEvent[] = [];
        members.forEach((member: IMember) => {
          if (member.mainData.birthday) {
            const event: any = {
              title: 'Geburtstag von ' + member.mainData.firstName + ' ' + member.mainData.lastName + ' (' + this.memberService.calculateAge(member.mainData.birthday) + ' Jahre)',
              start: moment(member.mainData.birthday).set('year', moment().year()).format('YYYY-MM-DD')
            };
            memberEvents.push(event);
          }
        });
        this.events$.push(...memberEvents);
        console.log(this.events$);
        return this.events$;
      })
    );
    /* return this.calendarService.getCalendarEvents().map((calEvents: any) => {
      calEvents.items.forEach((event: ICalendarEvent) => {
        const startDate = event.start.dateTime.substr(0, 10);
        const calendarEvent: any = {
          title: event.summary,
          start: startDate
        };
        this.events$.push(calendarEvent);
      }); */
  }
}
