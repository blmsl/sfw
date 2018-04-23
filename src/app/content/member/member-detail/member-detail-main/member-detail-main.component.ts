import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { MemberService } from '../../../../shared/services/member/member.service';

@Component({
  selector: 'member-detail-main',
  templateUrl: './member-detail-main.component.html',
  styleUrls: ['./member-detail-main.component.scss']
})
export class MemberDetailMainComponent implements OnInit {

  @Input() member: IMember;

  constructor(public memberService: MemberService) { }

  ngOnInit() {
  }

}
