import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { SeasonService } from '../../../../shared/services/season/season.service';
import { Observable } from 'rxjs/Rx';
import { ISeason } from '../../../../shared/interfaces/season.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { TeamService } from '../../../../shared/services/team/team.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';

@Component({
  selector: 'member-edit-teams',
  templateUrl: './member-edit-teams.component.html',
  styleUrls: ['./member-edit-teams.component.scss']
})
export class MemberEditTeamsComponent implements OnInit {

  @Input() teams: ITeam[];
  @Input() member: IMember;

  @Output() deleteMemberFromTeam: EventEmitter<{team: ITeam, member: IMember}> = new EventEmitter<{team: ITeam, member: IMember}>(false);
  public seasons$: Observable<ISeason[]>;

  constructor(private teamService: TeamService,
              private alertService: AlertService,
              private seasonService: SeasonService) {
    this.seasons$ = seasonService.seasons$;
  }

  ngOnInit() {
  }

}
