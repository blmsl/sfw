import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  /* @Output() add: EventEmitter<void> = new EventEmitter<void>(false);
  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() edit: EventEmitter<number> = new EventEmitter<number>(false); */

  constructor() {
  }

  ngOnInit() {
  }

  isFunction(val) {
    return typeof val === 'function';
  }

}
