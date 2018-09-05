import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { TeamOfTheMonthService } from '../../../shared/services/team/team-of-the-month.service';
import { Observable, Subscription } from 'rxjs';
import { SeasonService } from '../../../shared/services/season/season.service';
import { ISeason } from '../../../shared/interfaces/season.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { MemberService } from '../../../shared/services/member/member.service';
import { MediaItemService } from '../../../shared/services/media/media-item.service';
import { IMediaItem } from '../../../shared/interfaces/media/media-item.interface';

@Component({
  selector: 'fame-team',
  templateUrl: './fame-team.component.html',
  styleUrls: ['./fame-team.component.scss']
})
export class FameTeamComponent implements OnInit, OnDestroy {

  public teamOfTheMonth: ITeam;
  public currentMonth: string;
  public title: string;

  public assignedSeason$: Observable<ISeason>;
  public assignedCategories$: Observable<ICategory[]>;
  public assignedPlayers$: Observable<IMember[]>;
  public assignedPositions$: Observable<IMember[]>;

  public teamImage: Observable<IMediaItem>;

  private teamSubscription: Subscription;

  constructor(private seasonService: SeasonService,
    private categoryService: CategoryService,
    private memberService: MemberService,
    private mediaItemService: MediaItemService,
    private teamOfTheMonthService: TeamOfTheMonthService) {
  }

  ngOnInit() {
    this.currentMonth = moment().format('YY') + '-' + moment().format('MM');
    this.teamSubscription = this.teamOfTheMonthService.getTeamOfTheMonthByTitle(this.currentMonth).subscribe((team: ITeam) => {
      this.teamOfTheMonth = team;

      if (this.teamOfTheMonth) {
        this.assignedSeason$ = this.seasonService.getSeasonById(this.teamOfTheMonth.assignedSeason);
        this.assignedCategories$ = this.categoryService.getCategoriesByIds(this.teamOfTheMonth.assignedTeamCategories);
        this.assignedPlayers$ = this.memberService.getMembersByIds(this.teamOfTheMonth.assignedPlayers);
        this.assignedPositions$ = this.memberService.getMembersByTeamPosition(this.teamOfTheMonth.assignedPositions);

        if (!this.teamImage) {
          this.teamImage = this.mediaItemService.getCurrentImage(['teams', 'profile'], this.teamOfTheMonth.id);
        }

      }
    });

    this.title = moment.localeData().months(moment()) + ' ' + moment().format('YYYY');
  }

  ngOnDestroy() {
    this.teamSubscription.unsubscribe();
  }

}
