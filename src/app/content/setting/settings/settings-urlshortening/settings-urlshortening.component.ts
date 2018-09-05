import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { IApplication }             from '../../../../shared/interfaces/application.interface';

@Component({
  selector: 'settings-urlshortening',
  templateUrl: './settings-urlshortening.component.html',
  styleUrls: ['./settings-urlshortening.component.scss']
})
export class SettingsUrlshorteningComponent implements OnInit {

  @Input() application: IApplication;

  public form: FormGroup;
  public shorteningProviders = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      urlShortening: ''
    });
  }

}
