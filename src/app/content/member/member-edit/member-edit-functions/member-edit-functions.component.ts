import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { SeasonService } from '../../../../shared/services/season/season.service';
import { Observable } from 'rxjs/index';
import { ISeason } from '../../../../shared/interfaces/season.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { TeamService } from '../../../../shared/services/team/team.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { CategoryService } from '../../../../shared/services/category/category.service';

@Component({
  selector: 'member-edit-functions',
  templateUrl: './member-edit-functions.component.html',
  styleUrls: ['./member-edit-functions.component.scss']
})
export class MemberEditFunctionsComponent implements OnInit {

  @Input() teams: ITeam[];
  @Input() member: IMember;
  @Input() clubs: IClub[];

  public seasons$: Observable<ISeason[]>;
  public categories$: Observable<ICategory[]>;

  constructor(private teamService: TeamService,
    private categoryService: CategoryService,
    private alertService: AlertService,
    private seasonService: SeasonService) {
    this.seasons$ = seasonService.seasons$;
    this.categories$ = categoryService.categories$;
  }

  ngOnInit() {
  }

  deleteMemberFromTeam($event: { team: ITeam, member: IMember }) {
    const index = $event.team.assignedPlayers.indexOf($event.member.id);
    $event.team.assignedPlayers.splice(index, 1);
    this.updateTeam($event.team, 'general.members.edit.removedMemberFromTeamManagement');
  }

  deleteMemberFromTeamManagement($event: { team: ITeam, member: IMember }) {
    for (let i = 0; i < $event.team.assignedPositions.length; i++) {
      if ($event.team.assignedPositions[i].assignedMember === $event.member.id) {
        $event.team.assignedPositions.splice(i, 1);
      }
    }
    this.updateTeam($event.team, 'general.members.edit.removedMemberFromTeamManagement');
  }

  updateTeam(team: ITeam, message: string) {
    this.teamService.updateTeam(team.id, team).then(
      () => this.alertService.showSnackBar('success', message),
      (error: any) => this.alertService.error(error)
    );
  }

}
