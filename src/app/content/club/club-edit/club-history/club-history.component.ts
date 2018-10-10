import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'club-history',
  templateUrl: './club-history.component.html',
  styleUrls: ['./club-history.component.scss']
})
export class ClubHistoryComponent implements OnInit {

  @Input() form: FormGroup;

  public froalaOptions: Object = {
    height: '75vh'
  };

  constructor() {
  }

  ngOnInit() {
  }

  cancel($event) {
    console.log($event);
  }
}
