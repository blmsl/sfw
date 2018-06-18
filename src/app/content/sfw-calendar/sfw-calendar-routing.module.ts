import { Routes } from '@angular/router';
import { CalendarDashboardComponent } from './calendar-dashboard/calendar-dashboard.component';
import { EventsResolver } from './events.resolver';

export const sfwCalendarRoutes: Routes = [

  {
    path: '',
    component: CalendarDashboardComponent,
    pathMatch: 'full',
    resolve: {
      events: EventsResolver
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
