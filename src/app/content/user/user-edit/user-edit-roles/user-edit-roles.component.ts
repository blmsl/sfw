import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'user-edit-roles',
  templateUrl: './user-edit-roles.component.html',
  styleUrls: ['./user-edit-roles.component.scss']
})
export class UserEditRolesComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() rolesNotEditableMessage: boolean;

  constructor() { }

  ngOnInit() {
  }

}
