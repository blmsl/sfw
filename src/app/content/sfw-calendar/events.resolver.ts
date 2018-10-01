import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ICalendarEvent } from '../../shared/interfaces/calendar/calendar-event.interface';
import { CalendarService } from '../../shared/services/calendar/calendar.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventsResolver implements Resolve<any> {

  constructor(private httpClient: HttpClient,
    private calendarService: CalendarService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.calendarService.getCalendars();
    return true;
    /*return this.calendarService.getCalendars().subscribe(events => {
      return events
    });*/
  }

}
