import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IArticle } from '../../../interfaces/article.interface';

@Component({
  selector: 'time-line-form',
  templateUrl: './time-line-form.component.html'
})
export class TimeLineFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedTimeLineEvent: number;
  @Input() articles: IArticle[];

  @Output() save: EventEmitter<void> = new EventEmitter<void>(false);
  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);

  public articles$: Observable<IArticle[]>;
  public colors = ['primary', 'warning', 'danger', 'success', 'info', 'none'];

  constructor() {
  }

  ngOnInit() {
  }

}
