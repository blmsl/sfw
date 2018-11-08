import {
  Component, Input,
  OnInit, ViewChild, ViewEncapsulation
} from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { CalendarService } from '../../../shared/services/calendar/calendar.service';
import { ICalendarEvent } from '../../../shared/interfaces/calendar/calendar-event.interface';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { EventDetailComponent } from '../event-detail/event-detail.component';

@Component({
  selector: 'calendar-dashboard',
  templateUrl: './calendar-dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    'calendar-dashboard.component.scss'
  ]
})
export class CalendarDashboardComponent implements OnInit {

  constructor(public calendarService: CalendarService,
              public dialog: MatDialog) {
  }

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  @Input() events: ICalendarEvent[];
  calendarOptions: Options;

  ngOnInit() {
    const _that = this;
    this.calendarService.getCalendars().subscribe(data => {
      this.calendarOptions = {
        editable: false,
        eventLimit: true,
        header: {
          left: 'title',
          center: 'month, basicWeek, basicDay', // agendaWeek,
          right: 'today prev,next'
        },
        selectable: true,
        events: data,
        allDayText: 'ganztägig',
        buttonText: {
          today: 'Heute',
          month: 'Monat',
          week: 'Woche',
          day: 'Tag',
          list: 'Liste'
        },
        defaultDate: new Date(),
        displayEventEnd: true,
        clickButton: (event) => {
          console.log(event);
        },
        eventMouseOver: (event) => {
          console.log(event);
        },
        firstDay: 1,
        fixedWeekCount: true,
        footer: true,
        // height: '100',
        locale: 'de',
        // slotDuration: '15',
        slotLabelFormat: 'hh:mm',
        timeFormat: 'hh:mm',
        timezone: 'local',
        validRange: {
          start: moment().subtract('14', 'day').format('YYYY-MM-DD'),
          end: moment().add('1', 'month').format('YYYY-MM-DD')
        },
        weekNumbers: true,
        weekNumberTitle: 'KW'
      };
    });
  }

  openDialog($event) {
    console.log($event);
    return false;
    /*
    _that.dialog.open(EventDetailComponent, {
      data: { event }
    }); */
  }
}
