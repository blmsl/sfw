import { Routes } from '@angular/router';
import { CalendarDashboardComponent } from './calendar-dashboard/calendar-dashboard.component';
import { EventsResolver } from './events.resolver';

export const sfwCalendarRoutes: Routes = [

  {
    path: 'list',
    component: CalendarDashboardComponent,
    resolve: {
      events: EventsResolver
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
