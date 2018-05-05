import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import 'moment/min/locales';

moment.locale('de-de');

@Component({
  selector: 'creation-date',
  templateUrl: 'creation-date.component.html'
})
export class CreationDateComponent {

  @Input() creation: string;
  public moment: any;

  public constructor() {
    this.moment = moment;
  }

}
