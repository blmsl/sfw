import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'settings-calendars',
  templateUrl: './settings-calendars.component.html',
  styleUrls: ['./settings-calendars.component.scss']
})
export class SettingsCalendarsComponent implements OnInit {

  @Input() form: FormGroup;
  @Output() addCalendar: EventEmitter<void> = new EventEmitter<void>(false);

  constructor() { }

  ngOnInit() {
  }

}
