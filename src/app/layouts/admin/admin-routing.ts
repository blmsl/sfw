import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BackendGuard } from '../../shared/guards/backend.guard';
import { AdminGuard } from '../../shared/guards/admin.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [BackendGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: '../../content/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'articles',
        loadChildren: '../../content/article/article.module#ArticleModule',
      },
      {
        path: 'categories',
        loadChildren: '../../content/category/category.module#CategoryModule',
        canActivate: [AdminGuard]
      },
      {
        path: 'calendar',
        loadChildren: '../../content/sfw-calendar/sfw-calendar.module#SFWCalendarModule',
        canActivate: [BackendGuard]
      },
      {
        path: 'clubs',
        loadChildren: '../../content/club/club.module#ClubModule',
        canActivate: [AdminGuard]
      },
      {
        path: 'locations',
        loadChildren: '../../content/location/location.module#LocationModule',
        canActivate: [AdminGuard]
      },
      {
        path: 'matches',
        loadChildren: '../../content/match/match.module#MatchModule',
        canActivate: [BackendGuard]
      },
      {
        path: 'members',
        loadChildren: '../../content/member/member.module#MemberModule',
        canActivate: [BackendGuard]
      },
      {
        path: 'newsletter',
        loadChildren: '../../content/newsletter/newsletter.module#NewsletterModule',
        canActivate: [AdminGuard]
      },
      {
        path: 'uploader',
        loadChildren: '../../content/uploader/uploader.module#UploaderModule',
        canActivate: [BackendGuard]
      },
      {
        path: 'settings',
        loadChildren: '../../content/setting/setting.module#SettingModule',
        canActivate: [AdminGuard]
      },
      {
        path: 'sponsors',
        loadChildren: '../../content/sponsor/sponsor.module#SponsorModule',
        canActivate: [AdminGuard]
      },
      {
        path: 'teams',
        loadChildren: '../../content/team/team.module#TeamModule',
        canActivate: [BackendGuard]
      },
      {
        path: 'users',
        loadChildren: '../../content/user/user.module#UserModule',
        canActivate: [AdminGuard]
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];
