import { Component } from '@angular/core';
import { ArticleService } from '../../../shared/services/article/article.service';
import { CategoryService } from '../../../shared/services/category/category.service';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { Observable } from 'rxjs';
import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { UserService } from '../../../shared/services/user/user.service';
import { IUser } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['articles.component.scss']
})

export class ArticlesComponent {

  public articles$: Observable<IArticle[]>;
  public categories$: Observable<ICategory[]>;
  public users$: Observable<IUser[]>;

  constructor(private articleService: ArticleService,
    private userService: UserService,
    private categoryService: CategoryService,
    public snackBar: MatSnackBar) {
    this.users$ = userService.users$;
    this.articles$ = articleService.articles$;
    this.categories$ = categoryService.categories$;
  }

  removeArticle($event) {
    this.articleService.removeArticle($event).then(
      () => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'success',
            message: 'general.articles.edit.deleteSuccess'
          },
          duration: 2500
        });
      },
      (error: any) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'error',
            message: error
          },
          duration: 2500
        });
      });
  }

  updateArticle($event) {
    this.articleService.updateArticle($event.article.id, $event.article).then(
      () => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'success',
            message: 'general.articles.edit.updateSuccess'
          },
          duration: 2500
        });
      },
      (error: any) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'error',
            message: error
          },
          duration: 2500
        });
      });
  }
}
