import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { ILocation } from '../../../../shared/interfaces/location/location.interface';

@Component({
  selector: 'team-detail-training',
  templateUrl: './team-detail-training.component.html',
  styleUrls: ['./team-detail-training.component.scss']
})
export class TeamDetailTrainingComponent implements OnInit {

  @Input() team: ITeam;
  @Input() locations: ILocation;

  constructor() {
  }

  ngOnInit() {
  }

}
