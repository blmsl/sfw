import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatListModule, MatMenuModule, MatTabsModule } from '@angular/material';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routing';
import { SharedModule } from '../../shared/shared.module';
import { MemberService } from '../../shared/services/member/member.service';
import { MatchService } from '../../shared/services/match/match.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CategoryService } from '../../shared/services/category/category.service';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { BirthdayModule } from '../../shared/components/birthday/birthday.module';
import { SharedMatchModule } from '../../shared/components/match/shared-match.module';
import { ArticleService } from '../../shared/services/article/article.service';
import { BirthdayListComponent } from './birthday-list/birthday-list.component';
import { UserService } from '../../shared/services/user/user.service';
import { SharedUserModule } from '../../shared/components/user/shared-user.module';
import { DashboardArticleListComponent } from './dashboard-article-list/dashboard-article-list.component';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  imports: [
    BirthdayModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    SharedMatchModule,
    PerfectScrollbarModule,
    RouterModule.forChild(dashboardRoutes),
    SharedModule,
    SharedUserModule,
    TimeagoModule
  ],
  declarations: [
    DashboardComponent,
    BirthdayListComponent,
    DashboardArticleListComponent
  ],
  providers: [
    ArticleService,
    CategoryService,
    CategoryTypeService,
    MatchService,
    MemberService,
    UserService
  ]
})

export class DashboardModule {
}
