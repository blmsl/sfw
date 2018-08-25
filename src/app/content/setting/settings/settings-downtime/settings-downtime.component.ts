import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'settings-downtime',
  templateUrl: './settings-downtime.component.html',
  styleUrls: ['./settings-downtime.component.scss']
})
export class SettingsDowntimeComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
