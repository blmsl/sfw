import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedTimeLineEvent: number;
  @Input() showLinks: boolean;

  @Output() add: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>(false);
  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() edit: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor() {
  }

  ngOnInit() {
  }

}
