import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../shared/services/article/article.service';
import { CategoryService } from '../../../shared/services/category/category.service';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { UserService } from '../../../shared/services/user/user.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUser } from '../../../shared/interfaces/user/user.interface';

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['articles.component.scss']
})

export class ArticlesComponent implements OnInit {

  public articles$: Observable<IArticle[]>;
  public categories$: Observable<ICategory[]>;
  public users$: Observable<IUser[]>;

  public form: FormGroup;
  public filters: {
    author?: string,
    sorting?: string,
    status?: number,
    tags?: string[]
  };

  constructor(private articleService: ArticleService,
              private userService: UserService,
              private alertService: AlertService,
              private fb: FormBuilder,
              private categoryService: CategoryService) {
    this.articles$ = articleService.articles$;
    this.users$ = this.userService.users$;
    this.categories$ = categoryService.categories$;
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedTags: undefined,
      creation: this.fb.group({
        'by': undefined,
      }),
      publication: this.fb.group({
        status: undefined
      }),
      sorting: 'desc'
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: {
      author: string,
      sorting: string,
      status: number,
      tags: string[]
    }) => {
      this.filters = changes;
    });
  }

  removeArticle($event) {
    this.articleService.removeArticle($event).then(
      () => this.alertService.showSnackBar('success', 'general.articles.edit.deleteSuccess'),
      (error: any) => this.alertService.showSnackBar('error', error.message));
  }

  updateArticle($event) {
    this.articleService.updateArticle($event.article.id, $event.article).then(
      () => this.alertService.showSnackBar('success', 'general.articles.edit.updateSuccess'),
      (error: any) => this.alertService.showSnackBar('error', error.message));
  }
}
