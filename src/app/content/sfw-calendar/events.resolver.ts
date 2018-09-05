import { Injectable }                                           from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable }                                           from 'rxjs';
import { ICalendarEvent }                                       from '../../shared/interfaces/calendar/calendar-event.interface';
import { CalendarService }                                      from '../../shared/services/calendar/calendar.service';

@Injectable()
export class EventsResolver implements Resolve<ICalendarEvent[]> {

  constructor(private calendarService: CalendarService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICalendarEvent[]> {

    // this.calendarService.getCalendarEvents().subscribe(events => console.log(events));

    return this.calendarService.getMemberBirthdays();
  }
}
