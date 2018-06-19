import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../interfaces/user/user.interface';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {

  @Input() userId: string;
  @Input() users: IUser[];

  constructor() {
  }

  ngOnInit() {
  }

}
