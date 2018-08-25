import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'settings-mailing',
  templateUrl: './settings-mailing.component.html',
  styleUrls: ['./settings-mailing.component.scss']
})
export class SettingsMailingComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
