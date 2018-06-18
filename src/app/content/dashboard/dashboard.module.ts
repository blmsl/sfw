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
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    BirthdayListComponent
  ],
  providers: [
    ArticleService,
    CategoryService,
    CategoryTypeService,
    MatchService,
    MemberService
  ]
})

export class DashboardModule {
}
