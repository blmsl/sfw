import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArticle } from '../../../interfaces/article.interface';
import { ITimeLineEvent } from '../../../interfaces/time-line-event.interface';

@Component({
  selector: 'time-line-list',
  templateUrl: './time-line-list.component.html',
  styleUrls: ['time-line-list.component.scss']
})
export class TimeLineListComponent implements OnInit {

  @Input() events: ITimeLineEvent[];
  @Input() showLinks: boolean;
  @Input() articles: IArticle[];

  @Output() delete: EventEmitter<ITimeLineEvent> = new EventEmitter<ITimeLineEvent>(false);
  @Output() edit: EventEmitter<ITimeLineEvent> = new EventEmitter<ITimeLineEvent>(false);

  constructor() {
  }

  ngOnInit() {
  }

  getDate(dateString){
    if(dateString.seconds){
      return dateString.seconds * 1000;
    } else {
      return new Date(dateString);
    }
  }

}
