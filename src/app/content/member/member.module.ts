import { NgModule } from '@angular/core';
import { memberRoutingModule } from './member-routing.module';
import { MembersComponent } from './members/members.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberResolver } from './member.resolver';
import { SharedModule } from '../../shared/shared.module';
import { MemberService } from '../../shared/services/member/member.service';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberStatisticsComponent } from './member-statistics/member-statistics.component';
import { MemberDetailMainComponent } from './member-detail/member-detail-main/member-detail-main.component';
import { MemberDetailDriveComponent } from './member-detail/member-detail-drive/member-detail-drive.component';
import { MemberStateService } from '../../shared/services/member/member-state.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MemberEditMainComponent } from './member-edit/member-edit-main/member-edit-main.component';
import { MemberEditDriveComponent } from './member-edit/member-edit-drive/member-edit-drive.component';
import { PendingChangesGuard } from '../../shared/guards/pending-changes.guard';
import { FameMemberComponent } from './fame-member/fame-member.component';
import { MemberEditProfileComponent } from './member-edit/member-edit-profile/member-edit-profile.component';
import { MemberEditInterviewsComponent } from './member-edit/member-edit-interviews/member-edit-interviews.component';
import { MemberDetailProfileComponent } from './member-detail/member-detail-profile/member-detail-profile.component';
import { MemberDetailInterviewsComponent } from './member-detail/member-detail-interviews/member-detail-interviews.component';
import { ArticleService } from '../../shared/services/article/article.service';
import { MemberEditOtherOpinionsComponent } from './member-edit/member-edit-other-opinions/member-edit-other-opinions.component';
import { ClubService } from '../../shared/services/club/club.service';
import { TeamService } from '../../shared/services/team/team.service';
import { MemberDetailOpinionsComponent } from './member-detail/member-detail-opinions/member-detail-opinions.component';
import { CategoryService } from '../../shared/services/category/category.service';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { IsEmptyPipe } from '../../shared/pipes/is-empty.pipe';
import { BirthdayModule } from '../../shared/components/birthday/birthday.module';
import { MemberOfTheWeekService } from '../../shared/services/member/member-of-the-week.service';
import { MediaModule } from '../../shared/components/media/media.module';
import { MediaItemService } from '../../shared/services/media/media-item.service';
import { SeasonService } from '../../shared/services/season/season.service';
import { IsTeamMemberFilterPipe } from '../../shared/pipes/is-team-member-filter.pipe';
import { SeasonsWithTeamsFilterPipe } from '../../shared/pipes/seasons-with-teams-filter.pipe';
import { MemberEditFunctionsComponent } from './member-edit/member-edit-functions/member-edit-functions.component';
import { IsTeamManagementFilterPipe } from '../../shared/pipes/is-team-management-filter.pipe';
import { CreationModule } from '../../shared/components/creation/creation.module';
import { IsMemberInClubManagementFilterPipe } from '../../shared/pipes/is-member-in-club-management-filter.pipe';
import { MemberMatchStatisticsComponent } from './member-match-statistics/member-match-statistics.component';
import { FameMemberListComponent } from './fame-member/fame-member-list/fame-member-list.component';
import { FameMemberEntryComponent } from './fame-member/fame-member-entry/fame-member-entry.component';
import { SharedArticleModule } from '../../shared/components/article/shared-article.module';
import { MemberMediaComponent } from './member-media/member-media.component';

@NgModule({
  imports: [
    BirthdayModule,
    CreationModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MediaModule,
    memberRoutingModule,
    PerfectScrollbarModule,
    SharedModule,
    SharedArticleModule
  ],
  declarations: [
    FameMemberComponent,
    IsEmptyPipe,
    IsMemberInClubManagementFilterPipe,
    IsTeamMemberFilterPipe,
    IsTeamManagementFilterPipe,
    MemberDetailComponent,
    MemberDetailMainComponent,
    MemberDetailDriveComponent,
    MemberDetailInterviewsComponent,
    MemberDetailOpinionsComponent,
    MemberDetailProfileComponent,
    MemberEditComponent,
    MemberEditMainComponent,
    MemberEditDriveComponent,
    MemberListComponent,
    MembersComponent,
    MemberStatisticsComponent,
    MemberEditProfileComponent,
    MemberEditInterviewsComponent,
    MemberEditOtherOpinionsComponent,
    MemberEditFunctionsComponent,
    SeasonsWithTeamsFilterPipe,
    MemberMatchStatisticsComponent,
    FameMemberListComponent,
    FameMemberEntryComponent,
    MemberMediaComponent
  ],
  providers: [
    ArticleService,
    CategoryService,
    CategoryTypeService,
    ClubService,
    MediaItemService,
    MemberOfTheWeekService,
    MemberResolver,
    MemberService,
    MemberStateService,
    PendingChangesGuard,
    SeasonService,
    TeamService
  ]
})

export class MemberModule {
}
