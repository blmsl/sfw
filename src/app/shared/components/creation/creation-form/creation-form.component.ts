import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUser } from '../../../interfaces/user/user.interface';

@Component({
  selector: 'creation-form',
  templateUrl: './creation-form.component.html'
})
export class CreationFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() users: IUser[];

  public constructor() {
  }

  ngOnInit() {
    if (!this.form.get('from').value) {
      this.form.get('from').setValue('system');
      this.form.disable();
    }
  }

}
