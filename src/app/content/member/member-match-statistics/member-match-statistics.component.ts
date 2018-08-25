import { Component, OnInit, Input } from '@angular/core';
import { IMember } from "../../../shared/interfaces/member/member.interface";
import { ISeason } from '../../../shared/interfaces/season.interface';
import { ITeam } from '../../../shared/interfaces/team/team.interface';

@Component({
  selector: 'member-match-statistics',
  templateUrl: './member-match-statistics.component.html',
  styleUrls: ['./member-match-statistics.component.scss']
})
export class MemberMatchStatisticsComponent implements OnInit {

  @Input() member: IMember;
  @Input() teams: ITeam[];
  @Input() seasons: ISeason[];

  constructor() {
  }

  ngOnInit() {
  }

}
