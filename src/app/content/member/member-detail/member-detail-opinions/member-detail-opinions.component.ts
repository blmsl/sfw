import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'member-detail-opinions',
  templateUrl: './member-detail-opinions.component.html',
  styleUrls: ['./member-detail-opinions.component.scss']
})
export class MemberDetailOpinionsComponent implements OnInit {

  @Input() member: IMember;
  @Input() members: IMember[];

  constructor() { }

  ngOnInit() {
  }

}
