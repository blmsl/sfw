import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDashboardComponent } from './article-dashboard/article-dashboard.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleResolver } from './article.resolver';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleMatchesComponent } from './article-matches/article-matches.component';
import { ApplicationResolver } from '../setting/application.resolver';

export const articleRoutes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: ArticleDashboardComponent
  },
  {
    path: 'matches',
    component: ArticleMatchesComponent
  },
  {
    path: 'create',
    component: ArticleEditComponent,
    resolve: {
      article: ArticleResolver
    }
  },
  {
    path: 'edit/:articleId',
    component: ArticleEditComponent,
    resolve: {
      article: ArticleResolver
    }
  },
  {
    path: 'detail/:articleId',
    component: ArticleDetailComponent,
    resolve: {
      article: ArticleResolver
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

