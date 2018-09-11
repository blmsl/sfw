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
  MatButtonModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import { MatchesComponent } from './matches/matches.component';
import { MatchPreviewComponent } from './match-detail/match-preview/match-preview.component';
import { LocationService } from '../../shared/services/location/location.service';
import { ArticleService } from '../../shared/services/article/article.service';
import { MatchEditMainComponent } from './match-edit/match-edit-main/match-edit-main.component';
import { TeamService } from '../../shared/services/team/team.service';
import { SeasonService } from '../../shared/services/season/season.service';
import { MatchEditStartingElevenComponent } from './match-edit/match-edit-formation/match-edit-starting-eleven/match-edit-starting-eleven.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MemberService } from '../../shared/services/member/member.service';
import { IsMemberInStartingElevenFilterPipe } from '../../shared/pipes/is-member-in-starting-eleven-filter.pipe';
import { IsMemberInSubstitutesListFilterPipe } from '../../shared/pipes/is-member-in-substitutes-list-filter.pipe';
import { MatchEditEventsComponent } from './match-edit/match-edit-events/match-edit-events.component';
import { MatchEditEventFormComponent } from './match-edit/match-edit-events/match-edit-event-form/match-edit-event-form.component';
import { QuillModule } from 'ngx-quill';
import { MatchDetailStartingElevenComponent } from './match-detail/match-detail-starting-eleven/match-detail-starting-eleven.component';
import { MatchEditArticlesComponent } from './match-edit/match-edit-articles/match-edit-articles.component';
import { MatchEditArticleFormComponent } from './match-edit/match-edit-articles/match-edit-article-form/match-edit-article-form.component';
import { MatchDetailArticlesComponent } from './match-detail/match-detail-articles/match-detail-articles.component';
import { MatchEditResultComponent } from './match-edit/match-edit-result/match-edit-result.component';
import { SharedArticleModule } from '../../shared/components/article/shared-article.module';
import { MatchDetailContentComponent } from './match-detail/match-detail-content/match-detail-content.component';
import { MatchDetailEventsComponent } from './match-detail/match-detail-events/match-detail-events.component';
import { MatchTableComponent } from './match-table/match-table.component';
import { MatchTableFilterComponent } from './match-table/match-table-filter/match-table-filter.component';
import { MatchTableListComponent } from './match-table/match-table-list/match-table-list.component';
import { MatchEditFormationComponent } from './match-edit/match-edit-formation/match-edit-formation.component';
import { MatchEditSubstitutionsComponent } from './match-edit/match-edit-formation/match-edit-substitutions/match-edit-substitutions.component';
import { MatchEditPlayerListComponent }    from './match-edit/match-edit-formation/match-edit-player-list/match-edit-player-list.component';
import { MatchFormationService }           from '../../shared/services/match/match-formation.service';
import { MatchFieldSquareComponent }       from './match-edit/match-edit-formation/match-field-square/match-field-square.component';
import { DragDropModule }                  from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    LinkModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTabsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    PerfectScrollbarModule,
    QuillModule,
    SharedModule,
    SharedArticleModule,
    SharedMatchModule,
    matchRoutingModule
  ],
  declarations: [
    IsMemberInSubstitutesListFilterPipe,
    IsMemberInStartingElevenFilterPipe,
    MatchDetailComponent,
    MatchEditComponent,
    MatchesComponent,
    MatchPreviewComponent,
    MatchEditMainComponent,
    MatchEditStartingElevenComponent,
    MatchEditEventsComponent,
    MatchEditEventFormComponent,
    MatchDetailStartingElevenComponent,
    MatchEditArticlesComponent,
    MatchEditArticleFormComponent,
    MatchDetailArticlesComponent,
    MatchEditResultComponent,
    MatchDetailContentComponent,
    MatchDetailEventsComponent,
    MatchTableComponent,
    MatchTableFilterComponent,
    MatchTableListComponent,
    MatchEditFormationComponent,
    MatchEditSubstitutionsComponent,
    MatchEditPlayerListComponent,
    MatchFieldSquareComponent
  ],
  providers: [
    ArticleService,
    CategoryService,
    CategoryTypeService,
    LocationService,
    MatchResolver,
    MatchService,
    MatchFormationService,
    MemberService,
    SeasonService,
    TeamService
  ]
})
export class MatchModule {
}
