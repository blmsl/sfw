import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { matchRoutingModule } from './match-routing.module';
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
import {
  MatButtonModule, MatCheckboxModule,
  MatChipsModule,
  MatExpansionModule,
  MatFormFieldModule, MatInputModule,
  MatListModule, MatSelectModule,
  MatTabsModule
} from '@angular/material';
import { MatchesComponent } from './matches/matches.component';
import { MatchPreviewComponent } from './match-detail/match-preview/match-preview.component';
import { LocationService } from '../../shared/services/location/location.service';
import { ArticleService } from '../../shared/services/article/article.service';
import { MatchEditMainComponent } from './match-edit/match-edit-main/match-edit-main.component';
import { TeamService } from '../../shared/services/team/team.service';
import { SeasonService } from '../../shared/services/season/season.service';
import { MatchEditStartingElevenComponent } from './match-edit/match-edit-starting-eleven/match-edit-starting-eleven.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ArticleCardComponent } from '../article/article-card/article-card.component';

@NgModule({
  imports: [
    CommonModule,
    LinkModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    PerfectScrollbarModule,
    SharedModule,
    SharedMatchModule,
    matchRoutingModule
  ],
  declarations: [
    ArticleCardComponent,
    MatchDetailComponent,
    MatchEditComponent,
    MatchesComponent,
    MatchPreviewComponent,
    MatchEditMainComponent,
    MatchEditStartingElevenComponent
  ],
  providers: [
    ArticleService,
    CategoryService,
    CategoryTypeService,
    LocationService,
    MatchResolver,
    MatchService,
    SeasonService,
    TeamService
  ]
})
export class MatchModule {
}
