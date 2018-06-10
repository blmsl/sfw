import { NgModule } from '@angular/core';
import { articleRoutes } from './articles-routing.module';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleResolver } from './article.resolver';
import { SharedModule } from '../../shared/shared.module';
import { ArticleService } from '../../shared/services/article/article.service';
import { CategoryService } from '../../shared/services/category/category.service';
import { RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { ArticleDashboardComponent } from './article-dashboard/article-dashboard.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleMatchesComponent } from './article-matches/article-matches.component';
import { SharedMatchModule } from '../../shared/components/match/shared-match.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatchService } from '../../shared/services/match/match.service';
import { MemberService } from '../../shared/services/member/member.service';
import { UserService } from '../../shared/services/user/user.service';
import { PaginationService } from '../../shared/services/pagination/pagination.service';
import { ScrollableDirective } from '../../shared/directives/scrollable/scrollable.directive';
import { ArticleEditSidebarComponent } from './article-edit/article-edit-sidebar/article-edit-sidebar.component';
import { TagInputModule } from 'ngx-chips';
import { LocationService } from '../../shared/services/location/location.service';
import { TeamService } from '../../shared/services/team/team.service';
import { SeasonService } from '../../shared/services/season/season.service';
import { SharedCategoryModule } from '../../shared/components/category/shared-category.module';
import { SidebarMetaDataComponent } from './article-edit/article-edit-sidebar/sidebar-meta-data/sidebar-meta-data.component';
import { ApplicationService } from '../../shared/services/application/application.service';
import { SidebarMainDataComponent } from './article-edit/article-edit-sidebar/sidebar-main-data/sidebar-main-data.component';
import { SfwEditorModule } from '../../shared/components/editor/sfw-editor.module';
import { ArticleListFilterComponent } from './article-list/article-list-filter/article-list-filter.component';
import { SidebarLinksDataComponent } from './article-edit/article-edit-sidebar/sidebar-links-data/sidebar-links-data.component';
import { NgxEditorModule } from 'ngx-editor';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    NgxEditorModule,
    SharedMatchModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    PerfectScrollbarModule,
    RouterModule.forChild(articleRoutes),
    SfwEditorModule,
    SharedModule,
    SharedCategoryModule,
    TagInputModule
  ],
  declarations: [
    ArticleDashboardComponent,
    ArticleDetailComponent,
    ArticleEditComponent,
    ArticleEditSidebarComponent,
    ArticleListComponent,
    ArticleMatchesComponent,
    ArticlesComponent,
    ScrollableDirective,
    SidebarMetaDataComponent,
    SidebarMainDataComponent,
    ArticleListFilterComponent,
    SidebarLinksDataComponent
  ],
  providers: [
    ApplicationService,
    ArticleResolver,
    ArticleService,
    CategoryService,
    CategoryTypeService,
    LocationService,
    MatchService,
    MemberService,
    PaginationService,
    SeasonService,
    TeamService,
    UserService
  ]
})

export class ArticleModule {
}
