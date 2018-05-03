import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { matchRoutingModule } from './match-routing.module';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatchEditComponent } from './match-edit/match-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { SharedMatchModule } from '../../shared/components/match/shared-match.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatchService } from '../../shared/services/match/match.service';
import { CategoryService } from '../../shared/services/category/category.service';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { MatchResolver } from './match.resolver';
import { LinkModule } from '../../shared/components/links/link.module';
import { MatListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    LinkModule,
    MatListModule,
    PerfectScrollbarModule,
    SharedModule,
    SharedMatchModule,
    matchRoutingModule
  ],
  declarations: [
    MatchListComponent,
    MatchDetailComponent,
    MatchEditComponent
  ],
  providers: [
    CategoryService,
    CategoryTypeService,
    MatchResolver,
    MatchService
  ]
})
export class MatchModule {
}
