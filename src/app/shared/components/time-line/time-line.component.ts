import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IArticle } from '../../interfaces/article.interface';

@Component({
  selector: 'time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedTimeLineEvent: number;
  @Input() showLinks: boolean;
  @Input() articles: IArticle[];

  @Output() add: EventEmitter<void> = new EventEmitter<void>(false);
  @Output() save: EventEmitter<void> = new EventEmitter<void>(false);
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>(false);

  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() edit: EventEmitter<number> = new EventEmitter<number>(false);

  constructor() {
  }

  ngOnInit() {
  }

}
