import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PendingChangesGuard } from '../../shared/services/auth/pending-changes.guard';
import { MembersComponent } from './members/members.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberResolver } from './member.resolver';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberStatisticsComponent } from './member-statistics/member-statistics.component';
import { FameMemberComponent } from './fame-member/fame-member.component';

const routes: Routes = [
  {
    path: 'list',
    component: MembersComponent,
  },
  {
    path: 'edit/:memberId',
    canDeactivate: [PendingChangesGuard],
    component: MemberEditComponent,
    resolve: {
      member: MemberResolver
    },
  },
  {
    path: 'detail/:memberId',
    component: MemberDetailComponent,
    resolve: {
      member: MemberResolver
    },
  },
  {
    path: 'statistics',
    component: MemberStatisticsComponent
  },
  {
    path: 'fame',
    component: FameMemberComponent
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

export const memberRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
