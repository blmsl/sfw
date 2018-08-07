import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMatch } from '../../../shared/interfaces/match/match.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Observable } from 'rxjs/index';
import { ICategory }          from '../../../shared/interfaces/category.interface';
import { ILocation }          from '../../../shared/interfaces/location/location.interface';
import { LocationService } from '../../../shared/services/location/location.service';
import { IArticle }        from '../../../shared/interfaces/article.interface';
import { ArticleService }  from '../../../shared/services/article/article.service';
import { MatchService }    from '../../../shared/services/match/match.service';
import { AlertService }    from '../../../shared/services/alert/alert.service';
import { MemberService }   from '../../../shared/services/member/member.service';
import { IMember }         from '../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {

  public match: IMatch;
  public categories$: Observable<ICategory[]>;
  public locations$: Observable<ILocation[]>;
  public articles$: Observable<IArticle[]>;
  public members$: Observable<IMember[]>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private locationService: LocationService,
    private memberService: MemberService,
    private matchService: MatchService) {
    this.articles$ = articleService.articles$;
    this.categories$ = categoryService.categories$;
    this.locations$ = locationService.locations$;
    this.members$ = memberService.members$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { match: IMatch }) => this.match = data.match);
  }

  removeMatch(match: IMatch) {
    this.matchService.removeMatch(match).then(
      () => this.router.navigate(['/matches']).then(),
      (error: any) => this.alertService.showSnackBar('error', error)
    );
  }

}
