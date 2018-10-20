import {
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { OptionsInput } from 'fullcalendar';
import { ICalendarEvent } from '../../../../shared/interfaces/calendar/calendar-event.interface';
import * as moment from 'moment';
import { CalendarComponent } from 'ap-angular-fullcalendar';
import * as $ from 'jquery';

@Component({
  selector: 'app-fullcalendar',
  templateUrl: './fullcalendar.component.html'
})
export class FullcalendarComponent implements OnInit {

  @ViewChild('calendar') calendar: CalendarComponent;
  @Input() events: ICalendarEvent[];

  public isInitialized: boolean = false;

  public calendarOptions: OptionsInput = {
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
  };

  constructor() {
  }

  ngOnInit() {

    this.isInitialized = true;

    this.calendarOptions = {
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
    };
  }

}
