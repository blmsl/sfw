import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchResolver } from './match.resolver';
import { MatchDetailComponent } from './match-detail/match-detail.component';

const routes: Routes = [
  {
    path: 'list',
    component: MatchListComponent,
  },
  {
    path: 'detail/:matchId',
    component: MatchDetailComponent,
    resolve: {
      location: MatchResolver
    },
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

export const matchRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
