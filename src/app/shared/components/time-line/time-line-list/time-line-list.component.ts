import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITimeLineEvent } from '../../../interfaces/time-line-event.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'time-line-list',
  templateUrl: './time-line-list.component.html',
  styleUrls: ['time-line-list.component.scss']
})
export class TimeLineListComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() showLinks: boolean;

  @Output() add: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() edit: EventEmitter<number> = new EventEmitter<number>(false);

  public step = 0;

  constructor() {
  }

  ngOnInit() {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
