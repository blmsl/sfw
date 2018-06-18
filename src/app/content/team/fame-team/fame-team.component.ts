import { Component, OnInit } from '@angular/core';
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
import { forkJoin, of } from 'rxjs/index';

@Component({
  selector: 'fame-team',
  templateUrl: './fame-team.component.html',
  styleUrls: ['./fame-team.component.scss']
})
export class FameTeamComponent implements OnInit {

  public teamsOfTheMonth$: ITeamOfTheMonth[];
  public teams$: ITeam[];
  public categories$: ICategory[];
  public members$: IMember[];
  public seasons$: ISeason[];

  public currentMonth: string;
  public dataIsLoaded: boolean = false;

  constructor(private teamOfTheMonthService: TeamOfTheMonthService,
              private categoryService: CategoryService,
              private memberService: MemberService,
              private seasonService: SeasonService,
              private teamService: TeamService) {
  }

  ngOnInit() {
    this.currentMonth = moment().format('YY') + '-' + moment().format('MM');

    forkJoin([
      this.seasonService.seasons$,
      // this.teamService.teams$,
      of('4555')
    ]).subscribe((results: any) => {
      console.log(results);
      this.dataIsLoaded = true;
    });

    /*

    (
      //teamOfTheMonthService.teamsOfTheMonth$,
      this.teamService.teams$,
      //memberService.members$,
      //categoryService.categories$,
      this.seasonService.seasons$
    ).subscribe((results:any) => {
      console.log(results);
      /*this.teamsOfTheMonth$ = results[0];
      this.teams$ = results[1];
       this.members$ = results[2];
      this.categories$ = results[3];
      this.seasons$ = results[4];

    }, (error: any) => console.log(error));
    */
  }

  getTitle() {
    return moment.localeData().months(moment()) + ' ' + moment().format('YYYY');
  }
}
