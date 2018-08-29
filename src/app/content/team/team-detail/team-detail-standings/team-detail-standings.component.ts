import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';

@Component({
  selector: 'team-detail-standings',
  templateUrl: './team-detail-standings.component.html',
  styleUrls: ['./team-detail-standings.component.scss']
})
export class TeamDetailStandingsComponent implements OnInit {

  @Input() team: ITeam;

  constructor() {
  }

  ngOnInit() {
  }

}
