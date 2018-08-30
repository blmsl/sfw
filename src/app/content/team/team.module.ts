import { NgModule } from '@angular/core';
import { teamRoutes } from './team-routing.module';
import { TeamsComponent } from './teams/teams.component';
import { TeamListComponent } from './team-list/team-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TeamResolver } from './team.resolver';
import { TeamService } from '../../shared/services/team/team.service';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { QuillModule } from 'ngx-quill';
import { CategoryService } from '../../shared/services/category/category.service';
import { ClubService } from '../../shared/services/club/club.service';
import { MemberService } from '../../shared/services/member/member.service';
import { UserService } from '../../shared/services/user/user.service';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { SeasonService } from '../../shared/services/season/season.service';
import { TeamTrainingComponent } from './team-edit/team-training/team-training.component';
import { TeamTrainingFormComponent } from './team-edit/team-training/team-training-form/team-training-form.component';
import { LocationService } from '../../shared/services/location/location.service';
import { ApplicationService } from '../../shared/services/application/application.service';
import { TeamPositionsComponent } from './team-edit/team-positions/team-positions.component';
import { TeamPositionFormComponent } from './team-edit/team-positions/team-position-form/team-position-form.component';
import { TeamMediaComponent } from './team-media/team-media.component';
import { FameTeamComponent } from './fame-team/fame-team.component';
import { TeamEditMainComponent } from './team-edit/team-edit-main/team-edit-main.component';
import { TeamDetailMainComponent } from './team-detail/team-detail-main/team-detail-main.component';
import { TeamDetailPositionsComponent } from './team-detail/team-detail-positions/team-detail-positions.component';
import { TimeLineModule } from '../../shared/components/time-line/time-line.module';
import { TeamDetailEventsComponent } from './team-detail/team-detail-events/team-detail-events.component';
import { TeamDetailTrainingComponent } from './team-detail/team-detail-training/team-detail-training.component';
import { CreationModule } from '../../shared/components/creation/creation.module';
import { TeamOfTheMonthService } from '../../shared/services/team/team-of-the-month.service';
import { TeamDetailMatchesComponent } from './team-detail/team-detail-matches/team-detail-matches.component';
import { SharedMatchModule } from '../../shared/components/match/shared-match.module';
import { MatchService } from '../../shared/services/match/match.service';
import { TeamDetailStandingsComponent } from './team-detail/team-detail-standings/team-detail-standings.component';
import { TeamDetailMediaComponent } from './team-detail/team-detail-media/team-detail-media.component';
import { TeamStatisticsComponent } from './team-statistics/team-statistics.component';
import { ChartsModule } from 'ng2-charts';
import { TeamDetailCompetitionsComponent } from './team-detail/team-detail-standings/team-detail-competitions/team-detail-competitions.component';
import { TeamDetailArticlesComponent } from './team-detail/team-detail-articles/team-detail-articles.component';
import { SharedArticleModule } from '../../shared/components/article/shared-article.module';
import { TeamDetailStatisticsComponent } from './team-detail/team-detail-statistics/team-detail-statistics.component';
import { TeamDetailPlayerstatsComponent } from './team-detail/team-detail-playerstats/team-detail-playerstats.component';

@NgModule({
  imports: [
    ChartsModule,
    CreationModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    SharedMatchModule,
    QuillModule,
    RouterModule.forChild(teamRoutes),
    SharedModule,
    SharedArticleModule,
    SharedMatchModule,
    TimeLineModule
  ],
  declarations: [
    TeamDetailComponent,
    TeamEditComponent,
    TeamListComponent,
    TeamsComponent,
    TeamTrainingComponent,
    TeamTrainingFormComponent,
    TeamPositionsComponent,
    TeamPositionFormComponent,
    TeamMediaComponent,
    FameTeamComponent,
    TeamEditMainComponent,
    TeamDetailMainComponent,
    TeamDetailPositionsComponent,
    TeamDetailEventsComponent,
    TeamDetailTrainingComponent,
    TeamDetailMatchesComponent,
    TeamDetailStandingsComponent,
    TeamDetailMediaComponent,
    TeamStatisticsComponent,
    TeamDetailCompetitionsComponent,
    TeamDetailArticlesComponent,
    TeamDetailStatisticsComponent,
    TeamDetailPlayerstatsComponent
  ],
  providers: [
    ApplicationService,
    CategoryService,
    CategoryTypeService,
    ClubService,
    LocationService,
    MatchService,
    MemberService,
    SeasonService,
    TeamOfTheMonthService,
    TeamResolver,
    TeamService,
    UserService
  ]
})

export class TeamModule {
}
