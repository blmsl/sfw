import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMatch } from '../../../shared/interfaces/match/match.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { ArticleService } from '../../../shared/services/article/article.service';
import { MatchService } from '../../../shared/services/match/match.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {

  public match: IMatch;

  public assignedCategories$: Observable<ICategory[]>;
  public assignedArticles$: Observable<IArticle[]>;
  public assignedPlayers$: Observable<IMember[]>;
  public assignedSubstitutes$: Observable<IMember[]>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private memberService: MemberService,
    private matchService: MatchService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { match: IMatch }) => {
      this.match = data.match;
      this.assignedPlayers$ = this.memberService.getMembersByPosition(this.match.startingEleven);
      // this.assignedSubstitutes$ = this.memberService.getMembersByPosition(this.match.assignedSubstitutes);
      this.assignedArticles$ = this.articleService.getArticlesForMatch(this.match.id);
      this.assignedCategories$ = this.categoryService.getCategoriesByIds(this.match.assignedCategories);
    });
  }

  removeMatch(match: IMatch) {
    this.matchService.removeMatch(match).then(
      () => this.router.navigate(['/matches']).then(),
      (error: any) => this.alertService.showSnackBar('error', error)
    );
  }

}
