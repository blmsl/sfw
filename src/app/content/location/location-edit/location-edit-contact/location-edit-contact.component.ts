import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'location-edit-contact',
  templateUrl: './location-edit-contact.component.html'
})
export class LocationEditContactComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() members: IMember[];
  @Output() removeLocationContact: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() addLocationContact: EventEmitter<void> = new EventEmitter<void>(false);

  constructor() {
  }

  ngOnInit() {
  }

}
