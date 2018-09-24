import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'club-history',
  templateUrl: './club-history.component.html',
  styleUrls: ['./club-history.component.scss']
})
export class ClubHistoryComponent implements OnInit {

  @Input() form: FormGroup

  @ViewChild('history') history: QuillEditorComponent;

  constructor() {
  }

  ngOnInit() {
  }

  cancel($event) {
    console.log($event);
  }
}
