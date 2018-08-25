import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { FormGroup } from '@angular/forms';
import { MemberStateService } from '../../../../shared/services/member/member-state.service';
import { IClub } from '../../../../shared/interfaces/club/club.interface';

@Component({
  selector: 'member-edit-drive',
  templateUrl: './member-edit-drive.component.html',
  styleUrls: ['./member-edit-drive.component.scss']
})
export class MemberEditDriveComponent implements OnInit {

  @Input() member: IMember;
  @Input() clubs: IClub[];
  @Input() form: FormGroup;

  constructor(public memberStateService: MemberStateService) {
  }

  ngOnInit() {
  }

}
