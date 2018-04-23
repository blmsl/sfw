import { NgModule } from '@angular/core';
import { categoryRoutes } from './category-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryResolver } from './category.resolver';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../shared/services/category/category.service';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { CategoriesByCategoryTypeComponent } from './categories-by-category-type/categories-by-category-type.component';
import { ChartsModule } from 'ng2-charts';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import { CategoryAssignedObjectsComponent } from './category-detail/category-assigned-objects/category-assigned-objects.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { QuillModule } from 'ngx-quill';
import { UserService } from '../../shared/services/user/user.service';
import { CreationModule } from '../../shared/components/creation/creation.module';
import { SharedCategoryModule } from '../../shared/components/category/shared-category.module';
import { CategoryStatisticsComponent } from './category-statistics/category-statistics.component';

@NgModule({
  imports: [
    ChartsModule,
    CreationModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    MatTabsModule,
    QuillModule,
    RouterModule.forChild(categoryRoutes),
    SharedCategoryModule,
    SharedModule
  ],
  declarations: [
    CategoryAssignedObjectsComponent,
    CategoryDetailComponent,
    CategoryEditComponent,
    CategoryListComponent,
    CategoriesByCategoryTypeComponent,
    CategoriesComponent,
    CategoryStatisticsComponent
  ],
  providers: [
    CategoryResolver,
    CategoryService,
    CategoryTypeService,
    UserService
  ]
})

export class CategoryModule {
}
