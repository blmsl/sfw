import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../../../shared/interfaces/team/team.interface';

@Component({
  selector: 'team-detail-competitions',
  templateUrl: './team-detail-competitions.component.html',
  styleUrls: ['./team-detail-competitions.component.scss']
})
export class TeamDetailCompetitionsComponent implements OnInit {

  @Input() team: ITeam;

  constructor() { }

  ngOnInit() {
  }

}
