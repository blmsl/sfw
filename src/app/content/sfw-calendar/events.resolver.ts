import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class EventsResolver implements Resolve<any> {

  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // this.calendarService.getCalendars();
    return true;
    /*return this.calendarService.getCalendars().subscribe(events => {
     return events
     });*/
  }

}
