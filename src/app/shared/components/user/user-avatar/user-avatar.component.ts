import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../interfaces/user/user.interface';
import { UserService } from '../../../services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {

  @Input() userId: string;
  public user$: Observable<IUser>;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user$ = this.userService.getUserById(this.userId);
  }

}
