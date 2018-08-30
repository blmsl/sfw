import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { TeamService } from '../../../../shared/services/team/team.service';

@Component({
  selector: 'team-detail-playerstats',
  templateUrl: './team-detail-playerstats.component.html',
  styleUrls: ['./team-detail-playerstats.component.scss']
})
export class TeamDetailPlayerstatsComponent implements OnInit {

  @Input() team: ITeam;
  @Input() assignedPlayers: IMember[];

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    if(this.assignedPlayers){
      this.teamService.getPlayerStats(this.assignedPlayers);
    }
  }

}
