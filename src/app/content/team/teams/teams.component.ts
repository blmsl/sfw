import { Component, OnInit } from '@angular/core';
import OrderByDirection = firebase.firestore.OrderByDirection;
import { TeamService } from '../../../shared/services/team/team.service';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  styleUrls: ['teams.component.scss']
})

export class TeamsComponent implements OnInit {

  public itemSize = 120;
  public maxItems = 4;

  public sortOrder: OrderByDirection = 'desc';
  public sortField = 'title';
  public listType = 'teams';
  public viewPortHeight = '60vh';

  constructor(private teamService: TeamService,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }

  removeTeam(teamId: string) {
    this.teamService.removeTeamById(teamId)
      .then(
        () => this.alertService.showSnackBar('success', 'general.teams.edit.removedTeam'),
        (error: any) => this.alertService.showSnackBar('error', error.message)
      );
  }

}
