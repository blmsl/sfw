import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() deleteMemberFromTeam: EventEmitter<{ team: ITeam, member: IMember }> = new EventEmitter<{ team: ITeam, member: IMember }>(false);
  @Output() deleteMemberFromTeamManagement: EventEmitter<{ team: ITeam, member: IMember }> = new EventEmitter<{ team: ITeam, member: IMember }>(false);

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

}
