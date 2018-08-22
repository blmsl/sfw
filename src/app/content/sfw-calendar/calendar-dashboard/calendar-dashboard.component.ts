import {
  Component,
  OnInit
}                         from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'fullcalendar';
import { ICalendarEvent } from '../../../shared/interfaces/calendar-event.interface';
import { Observable }     from 'rxjs/index';

@Component({
  selector: 'calendar-dashboard',
  templateUrl: './calendar-dashboard.component.html'
})
export class CalendarDashboardComponent implements OnInit {

  public events$: ICalendarEvent[];
  public test$: Observable<any>;

  constructor(private route: ActivatedRoute
              /* private calendarService: CalendarService,
               private applicationService: ApplicationService */) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { events: ICalendarEvent[] }) => this.events$ = data.events);

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
