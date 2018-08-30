import {
  Component,
  OnInit
}                           from '@angular/core';
import {
  ActivatedRoute,
  Router
}                           from '@angular/router';
import { IUser }            from '../../../shared/interfaces/user/user.interface';
import { IUploaderConfig }  from '../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../shared/interfaces/media/uploader-options.interface';
import {
  FormBuilder,
  FormGroup
}                           from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged
}                           from 'rxjs/operators';
import { AuthService }      from '../../../shared/services/auth/auth.service';
import { UserService }      from '../../../shared/services/user/user.service';
import { AlertService }     from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: [ './user-edit.component.scss' ]
})
export class UserEditComponent implements OnInit {

  public user: IUser;
  public form: FormGroup;
  public notEditableMessage: boolean = false;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    headerTitle: 'general.users.edit.photoTitle'
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: [ 'users', 'profile' ],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: [ 'image/jpeg', 'image/gif', 'image/png' ]
  };

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private alertService: AlertService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { user: IUser }) => {
      this.user = data.user;
      this.uploaderOptions.itemId = this.user.id;
    });

    this.form = this.fb.group({
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      isDisabled: this.user.isDisabled,
      displayName: this.user.displayName,
      assignedRoles: this.fb.group({
        subscriber: this.user.assignedRoles.subscriber,
        editor: this.user.assignedRoles.editor,
        admin: this.user.assignedRoles.admin
      })
    });

    if (this.authService.userId === this.user.id) {
      this.form.get('isDisabled').disable();
      this.form.get('assignedRoles').disable();
      this.notEditableMessage = true;
    }

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IUser) => {
      this.user = Object.assign({}, this.user, changes);
      if (!this.form.invalid) {
        this.saveUser();
      }
    });
  }

  saveUser(redirect: boolean = false) {
    this.userService.updateUser(this.user.id, this.user).then(
      () => {
        if (redirect) this.redirectToList();
        this.alertService.showSnackBar('success', 'general.applications.updateMessage');
      },
      (error: any) => this.alertService.showSnackBar('error', error)
    );
  }

  removeUser(user: IUser) {
    this.userService.removeUser(user)
      .then(() => this.alertService.success('general.users.edit.deleted', false))
      .then(() => this.redirectToList(),
        (error: any) => this.alertService.error(error.message));
  }

  redirectToList() {
    this.router.navigate([ '/locations' ]).then();
  }

  uploadCompleted() {
  }

}
