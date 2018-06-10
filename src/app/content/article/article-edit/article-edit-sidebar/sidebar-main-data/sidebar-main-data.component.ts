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

  public host = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

  constructor() {
  }

  ngOnInit() {
  }

}
