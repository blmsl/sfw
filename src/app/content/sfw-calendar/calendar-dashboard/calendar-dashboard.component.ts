import {
  Component,
  OnInit
} from '@angular/core';
import 'fullcalendar';
import { CalendarService } from '../../../shared/services/calendar/calendar.service';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'calendar-dashboard',
  templateUrl: './calendar-dashboard.component.html'
})
export class CalendarDashboardComponent implements OnInit {

  public data$: Observable<any>;

  constructor(public calendarService: CalendarService) {
    this.data$ = this.calendarService.getCalendars();
  }

  ngOnInit() {
  }

}
