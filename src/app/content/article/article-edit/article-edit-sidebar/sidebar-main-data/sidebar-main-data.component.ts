import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUser } from '../../../../../shared/interfaces/user/user.interface';

@Component({
  selector: 'sidebar-main-data',
  templateUrl: './sidebar-main-data.component.html',
  styleUrls: ['./sidebar-main-data.component.scss']
})
export class SidebarMainDataComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() users: IUser[];

  constructor() {
  }

  ngOnInit() {
  }

}
