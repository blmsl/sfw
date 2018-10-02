import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'fullcalendar';
import { ICalendarEvent } from '../../../shared/interfaces/calendar/calendar-event.interface';
import { Observable } from 'rxjs/index';
import { CalendarService } from '../../../shared/services/calendar/calendar.service';

@Component({
  selector: 'calendar-dashboard',
  templateUrl: './calendar-dashboard.component.html'
})
export class CalendarDashboardComponent implements OnInit {

  constructor(public calendarService: CalendarService) {
    this.calendarService.getCalendars()
      .then(
        (success) => console.log(success),
        (error) => console.log(error))
      .catch((e) => console.log(e));
  }

  ngOnInit() {
    // this.route.data.subscribe((data: { events: ICalendarEvent[] }) => this.events$ = data.events);

    /*this.test$ =  this.applicationService.applications$.pipe(
     map((applications: IApplication[]) => {
     return applications[ 0 ];
     }),
     switchMap((application: IApplication) => {
     return this.calendarService.getCalendars(application.assignedCalendars);
     })
     );*/
  }

}
