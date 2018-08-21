import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';

@Component({
  selector: 'match-edit-articles',
  templateUrl: './match-edit-articles.component.html',
  styleUrls: ['./match-edit-articles.component.scss']
})
export class MatchEditArticlesComponent implements OnInit {

  @Input() match: IMatch;
  @Input() articles: IArticle[];

  constructor(private alertService: AlertService,
    private articleService: ArticleService) { }

  ngOnInit() {
  }

  deleteArticleToMatchAssignment(article: IArticle): void {
    let matchIndex = article.assignedMatches.indexOf(this.match.id);
    article.assignedMatches.splice(matchIndex, 1);
    this.articleService.updateArticle(article.id, article).then(
      () => this.alertService.success('general.articles.edit.assignmentDeleted'),
      (error: any) => this.alertService.error(error)
    );
  }

}
