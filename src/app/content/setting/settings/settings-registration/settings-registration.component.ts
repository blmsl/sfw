import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { IApplication } from '../../../../shared/interfaces/application.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { UserService } from '../../../../shared/services/user/user.service';

@Component({
  selector: 'settings-registration',
  templateUrl: './settings-registration.component.html',
  styleUrls: ['./settings-registration.component.scss']
})
export class SettingsRegistrationComponent implements OnInit {

  @Input() application: IApplication;
  @Output() saveApplication: EventEmitter<IApplication> = new EventEmitter<IApplication>(false);

  public form: FormGroup;
  public roles: string[];

  constructor(private fb: FormBuilder,
    private userService: UserService) {
    this.roles = userService.getUserRoles();
  }

  ngOnInit() {
    this.form = this.fb.group({
      registration: this.application.registration ? this.application.registration : []
    });

    this.form.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      if (this.form.valid) {
        this.application = Object.assign({}, this.application, changes);
        this.saveApplication.emit(this.application);
      }
    });
  }

}
