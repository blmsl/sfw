import { Component, Input } from '@angular/core';
import { ILocation } from '../../../../shared/interfaces/location/location.interface';

@Component({
  selector: 'location-detail-media',
  templateUrl: 'location-detail-media.component.html'
})

export class LocationDetailMediaComponent {

  @Input() location: ILocation;

  constructor() {
  }

}
