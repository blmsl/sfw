import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { MemberStateService } from '../../../../shared/services/member/member-state.service';

@Component({
  selector: 'member-detail-drive',
  templateUrl: './member-detail-drive.component.html',
  styleUrls: ['./member-detail-drive.component.scss']
})
export class MemberDetailDriveComponent implements OnInit {

  @Input() member: IMember;

  constructor(public memberStateService: MemberStateService) { }

  ngOnInit() {
  }

}
