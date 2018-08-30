import {
  Component,
  Input,
  OnInit
}                    from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'user-edit-main',
  templateUrl: './user-edit-main.component.html',
  styleUrls: ['./user-edit-main.component.scss']
})
export class UserEditMainComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() disableOwnAccount: boolean;

  constructor() { }

  ngOnInit() {
  }

}
