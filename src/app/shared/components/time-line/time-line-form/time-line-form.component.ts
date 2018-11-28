import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IArticle } from '../../../interfaces/article.interface';
import { ITimeLineEvent } from '../../../interfaces/time-line-event.interface';

@Component({
  selector: 'time-line-form',
  templateUrl: './time-line-form.component.html'
})
export class TimeLineFormComponent implements OnInit {

  @Input() editEvent: ITimeLineEvent;
  @Input() articles: IArticle[];
  public form: FormGroup;

  /* @Output() save: EventEmitter<void> = new EventEmitter<void>(false);
  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);

  public articles$: Observable<IArticle[]>;
  public colors = ['primary', 'warning', 'danger', 'success', 'info', 'none']; */

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.editEvent ? this.editEvent.title : '', [Validators.required, Validators.minLength(5)]],
      subTitle: [this.editEvent ? this.editEvent.subTitle : ''],
      text: [this.editEvent ? this.editEvent.text : ''],
      icon: [this.editEvent ? this.editEvent.icon : ''],
      color: [this.editEvent ? this.editEvent.color : ''],
      assignedArticle: [this.editEvent ? this.editEvent.assignedArticle : '', [Validators.required]],
      startDate: [this.editEvent ? this.editEvent.startDate : ''],
      endDate: [this.editEvent ? this.editEvent.endDate : '']
    });
  }

}
