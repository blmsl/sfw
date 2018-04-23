import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Observable } from 'rxjs';
import { IUser } from '../../../interfaces/user.interface';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {

  @Input() userId: string;
  public users$: Observable<IUser[]>;

  constructor(private userService: UserService) {
    this.users$ = userService.users$;
  }

  ngOnInit() {
  }

}
