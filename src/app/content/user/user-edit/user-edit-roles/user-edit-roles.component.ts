import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                       from '@angular/core';
import {
  FormBuilder,
  FormGroup
}                       from '@angular/forms';
import { IUser }        from '../../../../shared/interfaces/user/user.interface';
import { AuthService }  from '../../../../shared/services/auth/auth.service';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'user-edit-roles',
  templateUrl: './user-edit-roles.component.html',
  styleUrls: [ './user-edit-roles.component.scss' ]
})
export class UserEditRolesComponent implements OnInit {

  @Input() user: IUser;
  @Output() saveUser: EventEmitter<IUser> = new EventEmitter<IUser>(false);

  public form: FormGroup;
  public rolesNotEditableMessage: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedRoles: this.fb.group({
        subscriber: this.user.assignedRoles.subscriber,
        editor: this.user.assignedRoles.editor,
        admin: this.user.assignedRoles.admin
      })
    });

    if (this.authService.userId === this.user.id) {
      this.form.get('assignedRoles').disable();
      this.rolesNotEditableMessage = true;
    }

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IUser) => {
      if (this.form.valid) {
        this.saveUser.emit(changes);
      }
    });

  }

}
