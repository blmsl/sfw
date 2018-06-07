import { Component, ElementRef, Input, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { OptionsInput } from 'fullcalendar';
import { ICalendarEvent } from '../../../../shared/interfaces/calendar-event.interface';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { CalendarComponent } from 'ap-angular-fullcalendar';

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
      // window.open(event.url, 'gcalevent', 'width=700,height=600');
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
      start: moment().subtract('6', 'months').format('YYYY-MM-DD'),
      end: moment().add('1', 'years').endOf('year').format('YYYY-MM-DD')
    },
    weekNumbers: true,
    weekNumberTitle: 'KW'
  };

  constructor() {
  }

  ngOnInit() {
    // let cal = $('calendar');
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
        // opens events in a popup window
        // window.open(event.url, 'gcalevent', 'width=700,height=600');
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
        start: moment().subtract('1', 'years').startOf('year').format('YYYY-MM-DD'),
        end: moment().add('1', 'years').endOf('year').format('YYYY-MM-DD'),
      },
      weekNumbers: true,
      weekNumberTitle: 'KW'
    };
  }

}
