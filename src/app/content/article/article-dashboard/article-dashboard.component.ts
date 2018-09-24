import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../shared/services/article/article.service';
import { Observable } from 'rxjs/index';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { UserService } from '../../../shared/services/user/user.service';
import { IUser } from '../../../shared/interfaces/user/user.interface';

@Component({
  selector: 'article-dashboard',
  templateUrl: './article-dashboard.component.html'
})
export class ArticleDashboardComponent implements OnInit {

  public articles$: Observable<IArticle[]>;
  public users$: Observable<IUser[]>;

  constructor(private articleService: ArticleService,
    private userService: UserService) {
    this.users$ = userService.users$;
    this.articles$ = articleService.articles$;
  }

  ngOnInit() {
  }

}
