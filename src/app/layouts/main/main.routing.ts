import { Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { UnAuthGuard } from '../../shared/guards/unauth.guard';

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
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
