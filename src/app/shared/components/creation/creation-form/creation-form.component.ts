import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUser } from '../../../interfaces/user.interface';

@Component({
  selector: 'creation-form',
  templateUrl: './creation-form.component.html'
})
export class CreationFormComponent {

  @Input() form: FormGroup;
  @Input() users: IUser[];

  public constructor() {
  }

}
