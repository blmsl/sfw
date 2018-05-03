import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: '../../content/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'articles',
        loadChildren: '../../content/article/article.module#ArticleModule'
      },
      {
        path: 'categories',
        loadChildren: '../../content/category/category.module#CategoryModule'
      },
      {
        path: 'calendar',
        loadChildren: '../../content/sfw-calendar/sfw-calendar.module#SFWCalendarModule'
      },
      {
        path: 'clubs',
        loadChildren: '../../content/club/club.module#ClubModule'
      },
      {
        path: 'locations',
        loadChildren: '../../content/location/location.module#LocationModule'
      },
      {
        path: 'matches',
        loadChildren: '../../content/match/match.module#MatchModule'
      },
      {
        path: 'members',
        loadChildren: '../../content/member/member.module#MemberModule'
      },
      {
        path: 'newsletter',
        loadChildren: '../../content/newsletter/newsletter.module#NewsletterModule'
      },
      {
        path: 'uploader',
        loadChildren: '../../content/uploader/uploader.module#UploaderModule'
      },
      {
        path: 'settings',
        loadChildren: '../../content/setting/setting.module#SettingModule'
      },
      {
        path: 'sponsors',
        loadChildren: '../../content/sponsor/sponsor.module#SponsorModule'
      },
      {
        path: 'teams',
        loadChildren: '../../content/team/team.module#TeamModule'
      },
      {
        path: 'users',
        loadChildren: '../../content/user/user.module#UserModule'
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];
