import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryResolver } from './category.resolver';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryStatisticsComponent } from './category-statistics/category-statistics.component';

export const categoryRoutes: Routes = [

  {
    path: 'list',
    component: CategoriesComponent,
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: CategoryEditComponent,
    resolve: {
      category: CategoryResolver
    }
  },
  {
    path: 'edit/:categoryId',
    component: CategoryEditComponent,
    resolve: {
      category: CategoryResolver
    }
  },
  {
    path: 'detail/:categoryId',
    component: CategoryDetailComponent,
    resolve: {
      category: CategoryResolver
    }
  },
  {
    path: 'statistics',
    component: CategoryStatisticsComponent
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
