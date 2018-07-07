import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'creation-date',
  templateUrl: 'creation-date.component.html'
})
export class CreationDateComponent {

  @Input() creation: {
    seconds: number,
    nanoseconds: number
  };
  public moment: any;

  public constructor() {
    this.moment = moment;
  }

}
