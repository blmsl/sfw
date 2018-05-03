import { Routes } from '@angular/router';
import { CalendarDashboardComponent } from './calendar-dashboard/calendar-dashboard.component';
import { EventsResolver } from './events.resolver';

export const sfwCalendarRoutes: Routes = [

  {
    path: 'list',
    component: CalendarDashboardComponent,
    resolve: {
      calendarEvents: EventsResolver
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
