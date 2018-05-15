import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import * as moment           from 'moment';
import { CalendarComponent } from 'ap-angular-fullcalendar';
import * as $ from 'jquery';
import 'fullcalendar';
import { OptionsInput } from 'fullcalendar';

@Component({
  selector: 'calendar-dashboard',
  templateUrl: './calendar-dashboard.component.html'
})
export class CalendarDashboardComponent implements OnInit, AfterViewInit {

  // @ViewChild('calendar') calendar: CalendarComponent;
  public calendarOptions: OptionsInput;
  public isInitialized: boolean = false;

  constructor(private route: ActivatedRoute,
              private element:ElementRef,
              private zone: NgZone) {
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.zone.runOutsideAngular(() => {
        $('angular2-fullcalendar').fullCalendar(this.calendarOptions);
        this.isInitialized = true;
      })
    }, 100)
  }

  onCalendarInit(){
    console.log('now');
  }

  ngOnInit() {

    this.route.data.subscribe((data: { calendarEvents: any[] }) => {

      // let cal = $('calendar');
      // cal.fullcalendar('renderEvents', data.calendarEvents, true);
      // this.isInitialized = true;

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
        events: data.calendarEvents,
        eventClick: function (event) {
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

    });
  }

}
