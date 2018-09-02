import { ModuleWithProviders }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchResolver }        from './match.resolver';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatchesComponent }     from './matches/matches.component';
import { MatchEditComponent }   from './match-edit/match-edit.component';
import { MatchTableComponent }  from './match-table/match-table.component';

const routes: Routes = [
  {
    path: '',
    component: MatchesComponent,
  },
  {
    path: 'table',
    component: MatchTableComponent,
  },
  {
    path: 'edit/:matchId',
    component: MatchEditComponent,
    resolve: {
      match: MatchResolver
    }
  },
  {
    path: 'detail/:matchId',
    component: MatchDetailComponent,
    resolve: {
      match: MatchResolver
    },
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const matchRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
