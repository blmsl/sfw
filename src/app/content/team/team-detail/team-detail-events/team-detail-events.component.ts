import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';

@Component({
  selector: 'team-detail-events',
  templateUrl: './team-detail-events.component.html',
  styleUrls: ['./team-detail-events.component.scss']
})
export class TeamDetailEventsComponent implements OnInit {

  @Input() team: ITeam;

  constructor() {
  }

  ngOnInit() {
  }

}
