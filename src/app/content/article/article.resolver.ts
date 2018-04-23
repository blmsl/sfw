import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IArticle } from '../../shared/interfaces/article.interface';
import { ArticleService } from '../../shared/services/article/article.service';
import { Observable } from 'rxjs';
import {
  startWith,
  map,
  take
} from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators';
import { SeoService } from '../../shared/services/seo/seo.service';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';

const ARTICLE_ID = makeStateKey<any>('articleId');

@Injectable()
export class ArticleResolver implements Resolve<IArticle> {

  constructor(private articleService: ArticleService,
    private seoService: SeoService,
    private state: TransferState,
    private router: Router,
    private route: ActivatedRoute) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticle> {

    if (Object.keys(route.params).length === 0) {
      return this.articleService.setNewArticle();
    }

    return this.ssrFirestoreDoc(this.route.snapshot.paramMap.get('articleId'));
  }

  ssrFirestoreDoc(articleId: string) {
    const exists = this.state.get(ARTICLE_ID, {} as any);
    return this.articleService.getArticleById(articleId).pipe(
      tap((article: IArticle) => {
        this.state.set(ARTICLE_ID, article);
        this.seoService.generateTags({
          title: article.title,
          description: article.text,
          image: article.postImage
        });
      }),
      startWith(exists)
    );
  }

}
