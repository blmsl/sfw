import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { ITeamOfTheMonth } from '../../../shared/interfaces/member/team-of-the-month.interface';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { TeamOfTheMonthService } from '../../../shared/services/team/team-of-the-month.service';
import { TeamService } from '../../../shared/services/team/team.service';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ISeason } from '../../../shared/interfaces/season.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { SeasonService } from '../../../shared/services/season/season.service';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'fame-team',
  templateUrl: './fame-team.component.html',
  styleUrls: ['./fame-team.component.scss']
})
export class FameTeamComponent implements OnInit {

  public teamsOfTheMonth$: Observable<ITeamOfTheMonth[]>;
  public teams$: Observable<ITeam[]>;
  public categories$: Observable<ICategory[]>;
  public members$: Observable<IMember[]>;
  public seasons$: Observable<ISeason[]>;

  public currentMonth: string;

  constructor(private teamOfTheMonthService: TeamOfTheMonthService,
    private categoryService: CategoryService,
    private memberService: MemberService,
    private seasonService: SeasonService,
    private teamService: TeamService) {
    this.teamsOfTheMonth$ = teamOfTheMonthService.teamsOfTheMonth$;
    this.teams$ = teamService.teams$;
    this.members$ = memberService.members$;
    this.categories$ = categoryService.categories$;
    this.seasons$ = seasonService.seasons$;
  }

  ngOnInit() {
    this.currentMonth = moment().format('YY') + '-' + moment().format('MM');
  }

  getTitle() {
    return moment.localeData().months(moment()) + ' ' + moment().format('YYYY');
  }
}
