import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IArticle } from '../../../interfaces/article.interface';
import { ITimeLineEvent } from '../../../interfaces/time-line-event.interface';

@Component({
  selector: 'time-line-form',
  templateUrl: './time-line-form.component.html'
})
export class TimeLineFormComponent implements OnInit, OnChanges {

  @Input() editEvent: ITimeLineEvent;
  @Input() articles: IArticle[];
  public form: FormGroup;

  @Output() save: EventEmitter<ITimeLineEvent> = new EventEmitter<ITimeLineEvent>(false);
  @Output() update: EventEmitter<ITimeLineEvent> = new EventEmitter<ITimeLineEvent>(false);
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>(false);

  public colors = ['primary', 'warning', 'danger', 'success', 'info', 'none'];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.initForm();
  }

  ngOnChanges() {
    this.form = this.initForm();
  }

  initForm() {
    return this.fb.group({
      title: [this.editEvent ? this.editEvent.title : '', [Validators.required, Validators.minLength(5)]],
      subTitle: [this.editEvent ? this.editEvent.subTitle : ''],
      text: [this.editEvent ? this.editEvent.text : ''],
      icon: [this.editEvent ? this.editEvent.icon : ''],
      color: [this.editEvent ? this.editEvent.color : ''],
      assignedArticle: [this.editEvent ? this.editEvent.assignedArticle : '', [Validators.required]],
      startDate: [this.editEvent && this.editEvent.startDate ? new Date(this.editEvent.startDate.seconds * 1000) : '', [Validators.required]],
      endDate: [this.editEvent && this.editEvent.endDate ? new Date(this.editEvent.endDate.seconds * 1000) : '']
    });
  }

  saveForm() {
    if (this.editEvent) {
      this.update.emit(this.form.getRawValue());
    }
    else {
      this.save.emit(this.form.value);
    }
    this.resetForm();
  }

  cancelEdit(): void{
    this.cancel.emit();
    this.resetForm();
  }

  resetForm():void {
    this.form.reset();
  }

}
