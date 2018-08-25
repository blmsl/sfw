import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'settings-calendars',
  templateUrl: './settings-calendars.component.html',
  styleUrls: ['./settings-calendars.component.scss']
})
export class SettingsCalendarsComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
    console.log(this.form);
  }

}
