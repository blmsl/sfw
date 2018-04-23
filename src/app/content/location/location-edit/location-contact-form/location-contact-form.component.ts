import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'location-contact-form',
  templateUrl: './location-contact-form.component.html'
})
export class LocationContactFormComponent {

  @Input() form: FormGroup;
  @Input() members: IMember[];

  constructor() {
  }

}
