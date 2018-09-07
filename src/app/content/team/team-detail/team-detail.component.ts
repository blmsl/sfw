import {
  Component,
  OnInit
}                          from '@angular/core';
import {
  ActivatedRoute,
  Router
}                          from '@angular/router';
import { CategoryService } from '../../../shared/services/category/category.service';
import { MemberService }   from '../../../shared/services/member/member.service';
import { Observable }      from 'rxjs';
import { ICategory }       from '../../../shared/interfaces/category.interface';
import { IMember }         from '../../../shared/interfaces/member/member.interface';
import { ITeam }           from '../../../shared/interfaces/team/team.interface';
import { TeamService }     from '../../../shared/services/team/team.service';
import { SeasonService }   from '../../../shared/services/season/season.service';
import { ISeason }         from '../../../shared/interfaces/season.interface';
import { IClub }           from '../../../shared/interfaces/club/club.interface';
import { ClubService }     from '../../../shared/services/club/club.service';
import { ILocation }       from '../../../shared/interfaces/location/location.interface';
import { LocationService } from '../../../shared/services/location/location.service';
import { IMatch }          from '../../../shared/interfaces/match/match.interface';
import { MatchService }    from '../../../shared/services/match/match.service';
import { ArticleService }  from '../../../shared/services/article/article.service';
import { IArticle }        from '../../../shared/interfaces/article.interface';
import { AlertService }    from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'team-detail',
  templateUrl: './team-detail.component.html'
})
export class TeamDetailComponent implements OnInit {

  public team: ITeam;

  public assignedSeason$: Observable<ISeason>;
  public assignedClub$: Observable<IClub>;

  public assignedTeamCategories$: Observable<ICategory[]>;
  public assignedPlayers$: Observable<IMember[]>;
  public assignedPositions$: Observable<IMember[]>;
  public assignedLocations$: Observable<ILocation[]>;
  public assignedMatches$: Observable<IMatch[]>;
  public assignedArticles$: Observable<IArticle[]>;

  constructor(private route: ActivatedRoute,
              private seasonService: SeasonService,
              private alertService: AlertService,
              private clubService: ClubService,
              private teamService: TeamService,
              private matchService: MatchService,
              private categoryService: CategoryService,
              private memberService: MemberService,
              private locationService: LocationService,
              private articleService: ArticleService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { team: ITeam }) => {
      this.team = data.team;
      this.assignedClub$ = this.clubService.getClubById(this.team.assignedClub);
      this.assignedSeason$ = this.seasonService.getSeasonById(this.team.assignedSeason);
      this.assignedTeamCategories$ = this.categoryService.getCategoriesByIds(this.team.assignedTeamCategories);
      this.assignedPlayers$ = this.memberService.getMembersByIds(this.team.assignedPlayers);
      this.assignedPositions$ = this.memberService.getMembersByTeamPosition(this.team.assignedPositions);
      this.assignedLocations$ = this.locationService.getLocationsByTraining(this.team.assignedTrainings);
      this.assignedMatches$ = this.matchService.getMatchesForTeam(this.team);
      this.assignedArticles$ = this.articleService.getArticlesForTeam(this.team);
    });
  }

  removeTeam(team: ITeam) {
    this.teamService.removeTeam(team)
      .then(() => this.alertService.showSnackBar('success', 'general.applications.removedMessage'),
        (error: any) => this.alertService.showSnackBar('error', error.message))
      .then(() => this.router.navigate([ '/teams' ]))
      .catch((error: any) => this.alertService.showSnackBar('error', error.message));
  }

}
