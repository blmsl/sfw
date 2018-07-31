import { Component, OnInit, Input } from '@angular/core';
import { IMember } from "../../../shared/interfaces/member/member.interface";

@Component({
  selector: 'member-match-statistics',
  templateUrl: './member-match-statistics.component.html',
  styleUrls: ['./member-match-statistics.component.scss']
})
export class MemberMatchStatisticsComponent implements OnInit {

  @Input() member: IMember;

  constructor() {
  }

  ngOnInit() {
  }

}
