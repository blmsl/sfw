import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LocationsComponent } from './locations/locations.component';
import { LocationResolver } from './location.resolver';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { PendingChangesGuard } from '../../shared/services/auth/pending-changes.guard';
import { LocationStatisticsComponent } from './location-statistics/location-statistics.component';

export const routes: Routes = [
  {
    path: 'list',
    component: LocationsComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit/:locationId',
    // canDeactivate: [PendingChangesGuard],
    component: LocationEditComponent,
    resolve: {
      location: LocationResolver
    }
  },
  {
    path: 'detail/:locationId',
    component: LocationDetailComponent,
    resolve: {
      location: LocationResolver
    },
  },
  {
    path: 'map',
    component: LocationMapComponent
  },
  {
    path: 'statistics',
    component: LocationStatisticsComponent
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

export const locationRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
