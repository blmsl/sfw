import { Routes } from '@angular/router';
import { UnAuthGuard } from '../../shared/guards/unauth.guard';
import { AuthGuard } from '../../shared/guards/auth.guard';

export const mainRoutes: Routes = [
  {
    path: 'login',
    loadChildren: '../auth/login.module#LoginModule',
    canActivate: [UnAuthGuard]
  },
  {
    path: '',
    loadChildren: '../admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  }
];
