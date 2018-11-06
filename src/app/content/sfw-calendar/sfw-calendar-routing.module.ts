import { Routes } from '@angular/router';
import { CalendarDashboardComponent } from './calendar-dashboard/calendar-dashboard.component';

export const sfwCalendarRoutes: Routes = [
  {
    path: '',
    component: CalendarDashboardComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
