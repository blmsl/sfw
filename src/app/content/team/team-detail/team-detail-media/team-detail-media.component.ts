import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';

@Component({
  selector: 'team-detail-media',
  templateUrl: './team-detail-media.component.html',
  styleUrls: ['./team-detail-media.component.scss']
})
export class TeamDetailMediaComponent implements OnInit {

  @Input() team: ITeam;

  constructor() {
  }

  ngOnInit() {

  }

}
