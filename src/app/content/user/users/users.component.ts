import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';
import { Observable } from 'rxjs';
import { IUser } from '../../../shared/interfaces/user/user.interface';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})

export class UsersComponent {

  public users$: Observable<IUser[]>;

  constructor(public userService: UserService,
    private alertService: AlertService) {
    this.users$ = userService.users$;
  }

  removeUser(user: IUser) {
    this.userService.removeUser(user).then(
      () => this.alertService.showSnackBar('success', 'general.applications.removedMessage'),
      (error: any) => this.alertService.showSnackBar('error', error.message));
  }

  updateUser(user: IUser) {
    this.userService.updateUser(user.id, user).then(
      () => this.alertService.showSnackBar('success', 'general.applications.updateMessage'),
      (error: any) => this.alertService.showSnackBar('error', error.message));
  }

}
