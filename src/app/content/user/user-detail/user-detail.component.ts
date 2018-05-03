import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../../shared/interfaces/user/user.interface';
import { UserService } from '../../../shared/services/user/user.service';

@Component({
  selector: 'user-detail',
  templateUrl: 'user-detail.component.html'
})

export class UserDetailComponent implements OnInit {

  public user: IUser;

  constructor(public route: ActivatedRoute,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { user: IUser }) => this.user = data.user);
  }

  removeUser(user: IUser) {
    this.userService.removeUser(user.id).then(
      () => this.router.navigate(['/users/list'])
    );
  }

}
