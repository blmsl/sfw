import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../shared/services/article/article.service';
import { CategoryService } from '../../../shared/services/category/category.service';
import { IArticle } from '../../../shared/interfaces/article.interface';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { UserService } from '../../../shared/services/user/user.service';
import { IUser } from '../../../shared/interfaces/user/user.interface';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['articles.component.scss']
})

export class ArticlesComponent implements OnInit {

  public articles$: Observable<IArticle[]>;
  public categories$: Observable<ICategory[]>;
  public form: FormGroup;

  constructor(private articleService: ArticleService,
    private userService: UserService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private categoryService: CategoryService) {
    this.articles$ = articleService.articles$;
    this.categories$ = categoryService.categories$;
  }

  ngOnInit() {
    this.form = this.fb.group({
      author: '',
      status: '',
      tags: '',
      sorting: '-'
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      console.log(changes);
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
