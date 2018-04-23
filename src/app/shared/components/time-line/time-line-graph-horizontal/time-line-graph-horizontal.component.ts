import { Component, Input } from '@angular/core';
import { ITimeLineEvent } from '../../../interfaces/time-line-event.interface';

@Component({
  selector: 'time-line-graph-horizontal',
  templateUrl: './time-line-graph-horizontal.component.html',
  styleUrls: ['./time-line-graph-horizontal.component.css']
})
export class TimeLineGraphHorizontalComponent {

  @Input() timeLineEvents: ITimeLineEvent[];

  constructor() { }

}
