import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'member-detail-profile',
  templateUrl: './member-detail-profile.component.html',
  styleUrls: ['./member-detail-profile.component.scss']
})
export class MemberDetailProfileComponent implements OnInit {

  @Input() member: IMember;

  constructor() { }

  ngOnInit() {
  }

}
