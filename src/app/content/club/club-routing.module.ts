import { Routes } from '@angular/router';
import { ClubsComponent } from './clubs/clubs.component';
import { ClubResolver } from './club.resolver';
import { ClubEditComponent } from './club-edit/club-edit.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';

export const clubRoutes: Routes = [
  {
    path: 'list',
    component: ClubsComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit/:clubId',
    component: ClubEditComponent,
    resolve: {
      club: ClubResolver
    }
  },
  {
    path: 'detail/:clubId',
    component: ClubDetailComponent,
    resolve: {
      club: ClubResolver
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
