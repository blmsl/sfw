import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { IUser } from '../../../../shared/interfaces/user/user.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { AuthService } from '../../../../shared/services/auth/auth.service';

@Component({
  selector: 'user-edit-main',
  templateUrl: './user-edit-main.component.html',
  styleUrls: ['./user-edit-main.component.scss']
})
export class UserEditMainComponent implements OnInit {

  @Input() user: IUser;
  @Input() disableOwnAccount: boolean;
  @Output() saveUser: EventEmitter<IUser> = new EventEmitter<IUser>(false);

  public form: FormGroup;
  public notEditableMessage: boolean = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      isDisabled: this.user.isDisabled,
      displayName: this.user.displayName
    });

    if (this.authService.userId === this.user.id) {
      this.form.get('isDisabled').disable();
      this.notEditableMessage = true;
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
