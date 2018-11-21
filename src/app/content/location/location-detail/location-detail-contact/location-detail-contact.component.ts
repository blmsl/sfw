import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ILocation } from '../../../../shared/interfaces/location/location.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'location-detail-contact',
  templateUrl: './location-detail-contact.component.html'
})
export class LocationDetailContactComponent {

  @Input() location: ILocation;
  @Input() assignedMembers: IMember[];
  @Input() showLinks = false;

  constructor() {
  }

}
