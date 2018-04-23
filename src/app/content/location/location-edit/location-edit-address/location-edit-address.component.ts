import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'location-edit-address',
  templateUrl: './location-edit-address.component.html'
})
export class LocationEditAddressComponent {

  @Input() form: FormGroup;

  constructor() {
  }

}
