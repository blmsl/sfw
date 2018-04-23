import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { ITimeLineEvent } from '../../../../shared/interfaces/time-line-event.interface';

@Component({
  selector: 'club-history',
  templateUrl: './club-history.component.html',
  styleUrls: ['./club-history.component.scss']
})
export class ClubHistoryComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedTimeLineEvent: number;

  @Output() add: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() edit: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  @ViewChild('history') history: QuillEditorComponent;

  constructor() {
  }

  ngOnInit() {
  }

  cancel($event) {
    console.log($event);
  }
}
