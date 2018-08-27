import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'settings-urlshortening',
  templateUrl: './settings-urlshortening.component.html',
  styleUrls: ['./settings-urlshortening.component.scss']
})
export class SettingsUrlshorteningComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
