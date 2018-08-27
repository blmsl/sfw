import { Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';

export const mainRoutes: Routes = [
  {
    path: 'login',
    loadChildren: '../auth/login.module#LoginModule'
  },
  {
    path: '',
    loadChildren: '../admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  }
];
