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
import { MatchModule } from '../../shared/components/match/match.module';
import { ArticleService } from '../../shared/services/article/article.service';

@NgModule({
  imports: [
    BirthdayModule,
    // ChartsModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    // MatProgressBarModule,
    MatTabsModule,
    MatchModule,
    // NgxDatatableModule,
    PerfectScrollbarModule,
    RouterModule.forChild(dashboardRoutes),
    SharedModule
  ],
  declarations: [
    DashboardComponent
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
