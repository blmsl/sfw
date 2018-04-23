import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';
import { Observable } from 'rxjs';
import { IUser } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})

export class UsersComponent {

  public users$: Observable<IUser[]>;

  constructor(public userService: UserService) {
    this.users$ = userService.users$;
  }

  removeUser(userId: string) {
    this.userService.removeUser(userId).then();
  }

  updateUser($event) {
    this.userService.updateUser($event.user.id, $event.user).then();
  }

}
