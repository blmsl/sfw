import { Routes } from '@angular/router';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { SponsorResolver } from './sponsor.resolver';
import { SponsorEditComponent } from './sponsor-edit/sponsor-edit.component';
import { SponsorDetailComponent } from './sponsor-detail/sponsor-detail.component';

export const sponsorRoutes: Routes = [
  {
    path: 'list',
    component: SponsorsComponent,
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: SponsorEditComponent,
    resolve: {
      sponsor: SponsorResolver
    }
  },
  {
    path: 'edit/:sponsorId',
    component: SponsorEditComponent,
    resolve: {
      sponsor: SponsorResolver
    }
  },
  {
    path: 'details/:sponsorId',
    component: SponsorDetailComponent,
    resolve: {
      sponsor: SponsorResolver
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
