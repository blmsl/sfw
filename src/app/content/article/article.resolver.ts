import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IArticle } from '../../shared/interfaces/article.interface';
import { ArticleService } from '../../shared/services/article/article.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SeoService } from '../../shared/services/seo/seo.service';

@Injectable()
export class ArticleResolver implements Resolve<IArticle> {

  constructor(private articleService: ArticleService,
              private seoService: SeoService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticle> {

    if (Object.keys(route.params).length === 0) {
      return this.articleService.setNewArticle();
    }

    return this.articleService.getArticleById(route.params['articleId']).pipe(
      take(1),
      map((article: IArticle) => {
        if (article && article.id) {
          return article;
        } else {
          this.router.navigate(['/articles']).then();
        }
      })
    );
  }

  /*

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticle> {
    if (Object.keys(route.params).length === 0) {
        return this.articleService.setNewArticle();
      }

      return this.ssrFirestoreDoc(this.route.snapshot.paramMap.get('articleId'));
    }
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
  } */

}

