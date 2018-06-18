import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'club-timeline',
  templateUrl: './club-timeline.component.html',
  styleUrls: ['./club-timeline.component.scss']
})
export class ClubTimelineComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedTimeLineEvent: number;

  @Output() add: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() edit: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor() { }

  ngOnInit() {
  }

}
