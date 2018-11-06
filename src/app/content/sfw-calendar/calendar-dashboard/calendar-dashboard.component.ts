import {
  Component,
  OnInit
} from '@angular/core';
import 'fullcalendar';
import { CalendarService } from '../../../shared/services/calendar/calendar.service';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'calendar-dashboard',
  templateUrl: './calendar-dashboard.component.html',
  styles: [
    `@import "../../../../../node_modules/fullcalendar/dist/fullcalendar.css";`
  ]
})
export class CalendarDashboardComponent implements OnInit {

  public data$: Observable<any>;

  constructor(public calendarService: CalendarService) {
    this.data$ = this.calendarService.getCalendars();
  }

  /* calendarOptions: OptionsInput;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  @Input() events: ICalendarEvent[];

  /*public calendarOptions: OptionsInput = {
    allDayText: 'ganztägig',
    buttonText: {
      today: 'Heute',
      month: 'Monat',
      week: 'Woche',
      day: 'Tag',
      list: 'Liste'
    },
    defaultDate: moment().toISOString(),
    displayEventEnd: true,
    editable: false,
    events: null,
    eventClick: function(event) {
      // opens events in a popup window
      window.open(event.url, 'gcalevent', 'width=50,height=50');
      return false;
    },
    eventLimit: true, // allow "more" link when too many events
    firstDay: 1,
    fixedWeekCount: true,
    footer: true,
    header: {
      left: 'title',
      center: 'month, basicWeek, basicDay', // agendaWeek,
      right: 'today prev,next'
    },
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
  };*/

  ngOnInit() {
    /*
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: this.events
    };

    /*this.calendarOptions = {

      allDayText: 'ganztägig',
      buttonText: {
        today: 'Heute',
        month: 'Monat',
        week: 'Woche',
        day: 'Tag',
        list: 'Liste'
      },
      defaultDate: moment().toISOString(),
      displayEventEnd: true,
      editable: false,
      events: this.events,
      eventClick: function(event) {
        window.open(event.url, 'gcalevent', 'width=700,height=600');
        return false;
      },
      eventLimit: true,
      firstDay: 1,
      fixedWeekCount: true,
      footer: true,
      header: {
        left: 'title',
        center: 'month, basicWeek, basicDay', // agendaWeek,
        right: 'today prev,next'
      },
      // height: '100',
      locale: 'de',
      // slotDuration: '15',
      slotLabelFormat: 'hh:mm',
      timeFormat: 'hh:mm',
      timezone: 'local',
      validRange: {
        start: moment().subtract('1', 'years').startOf('year').format('YYYY-MM-DD'),
        end: moment().add('1', 'years').endOf('year').format('YYYY-MM-DD')
      },
      weekNumbers: true,
      weekNumberTitle: 'KW'
    };*/
  }

}
