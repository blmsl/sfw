import { NgModule } from '@angular/core';
import { clubRoutes } from './club-routing.module';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubResolver } from './club.resolver';
import { ClubEditComponent } from './club-edit/club-edit.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ClubService } from '../../shared/services/club/club.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule, MatDatepickerModule, MatExpansionModule, MatIconModule, MatInputModule, MatListModule,
  MatNativeDateModule, MatSelectModule,  MatTabsModule
} from '@angular/material';
import { LocationService } from '../../shared/services/location/location.service';
import { MemberService } from '../../shared/services/member/member.service';
import { MediaModule } from '../../shared/components/media/media.module';
import { TimeLineModule } from '../../shared/components/time-line/time-line.module';
import { ClubEditMainComponent } from './club-edit/club-edit-main/club-edit-main.component';
import { ClubHistoryComponent } from './club-edit/club-history/club-history.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { ClubManagementComponent } from './club-edit/club-management/club-management.component';
import { ClubHonorariesComponent } from './club-edit/club-honoraries/club-honoraries.component';
import { CategoryService } from '../../shared/services/category/category.service';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { ClubManagementFormComponent } from './club-edit/club-management/club-management-form/club-management-form.component';
import { ClubHonoraryFormComponent } from './club-edit/club-honoraries/club-honorary-form/club-honorary-form.component';
import { PublicationModule } from '../../shared/components/publication/publication.module';
import { ClubDetailMainComponent } from './club-detail/club-detail-main/club-detail-main.component';
import { ClubDetailHistoryComponent } from './club-detail/club-detail-history/club-detail-history.component';
import { ClubDetailManagementComponent } from './club-detail/club-detail-management/club-detail-management.component';
import { ClubDetailHonorariesComponent } from './club-detail/club-detail-honoraries/club-detail-honoraries.component';
import { ClubManagementListComponent } from './club-edit/club-management/club-management-list/club-management-list.component';
import { ClubHonoraryListComponent } from './club-edit/club-honoraries/club-honorary-list/club-honorary-list.component';
import { ClubDetailStatisticsComponent } from './club-detail/club-detail-statistics/club-detail-statistics.component';
import { MemberStateService } from '../../shared/services/member/member-state.service';
import { SeasonService } from '../../shared/services/season/season.service';
import { TeamService } from '../../shared/services/team/team.service';
import { CreationModule } from '../../shared/components/creation/creation.module';
import { ClubManagementPhotoComponent } from './club-edit/club-management/club-management-photo/club-management-photo.component';
import { ClubTimelineComponent } from './club-edit/club-timeline/club-timeline.component';
import { ClubDetailTimelineComponent } from './club-detail/club-detail-timeline/club-detail-timeline.component';
import { ClubDetailManagementFotoComponent } from './club-detail/club-detail-management/club-detail-management-foto/club-detail-management-foto.component';
import { ClubDetailManagementPositionsComponent } from './club-detail/club-detail-management/club-detail-management-positions/club-detail-management-positions.component';
import { ClubEditMediaComponent } from './club-edit/club-edit-media/club-edit-media.component';

@NgModule({
  imports: [
    CreationModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTabsModule,
    MediaModule,
    PublicationModule,
    RouterModule.forChild(clubRoutes),
    SharedModule,
    TimeLineModule
  ],
  declarations: [
    ClubDetailComponent,
    ClubDetailHistoryComponent,
    ClubDetailHonorariesComponent,
    ClubDetailMainComponent,
    ClubDetailManagementComponent,
    ClubDetailStatisticsComponent,
    ClubEditComponent,
    ClubEditMainComponent,
    ClubHistoryComponent,
    ClubHonorariesComponent,
    ClubHonoraryFormComponent,
    ClubHonoraryListComponent,
    ClubListComponent,
    ClubManagementComponent,
    ClubManagementFormComponent,
    ClubManagementListComponent,
    ClubsComponent,
    ClubManagementPhotoComponent,
    ClubTimelineComponent,
    ClubDetailTimelineComponent,
    ClubDetailManagementFotoComponent,
    ClubDetailManagementPositionsComponent,
    ClubEditMediaComponent,
  ],
  exports: [],
  providers: [
    CategoryService,
    CategoryTypeService,
    ClubResolver,
    ClubService,
    LocationService,
    MemberService,
    MemberStateService,
    PendingChangesGuard,
    SeasonService,
    TeamService
  ]
})

export class ClubModule {
}
