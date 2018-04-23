import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Observable } from 'rxjs';
import { IUser } from '../../../interfaces/user.interface';

@Component({
  selector: 'publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {

  @Input() form: FormGroup;

  public users$: Observable<IUser[]>;

  constructor(private userService: UserService) {
    this.users$ = userService.users$;
  }

  ngOnInit() {
  }

}
