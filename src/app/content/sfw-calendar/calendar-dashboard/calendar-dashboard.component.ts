import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'fullcalendar';
import { ICalendarEvent } from '../../../shared/interfaces/calendar-event.interface';

@Component({
  selector: 'calendar-dashboard',
  templateUrl: './calendar-dashboard.component.html'
})
export class CalendarDashboardComponent implements OnInit {

  public events$: ICalendarEvent[];

  constructor(private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.data.subscribe((data: { calendarEvents: any[] }) => {
      this.events$ = data.calendarEvents;
    });
  }

}
