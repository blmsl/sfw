import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../../shared/interfaces/user/user.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() users: IUser[];

  @Output() remove: EventEmitter<any> = new EventEmitter(false);
  @Output() update: EventEmitter<any> = new EventEmitter(false);

  public form: FormGroup;
  public searchFor: string = '';

  public itemsPerPageOptions = [
    1, 5, 10, 25, 50, 100
  ];

  constructor(private fb: FormBuilder, public authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      searchFor: '',
      limit: 10
    });
  }

  toggleUserStatus(user: IUser) {
    user.isDisabled = !user.isDisabled;
    console.log(user);
  }

}
