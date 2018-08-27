import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { UnAuthGuard } from '../../shared/guards/unauth.guard';
import { AuthGuard } from '../../shared/guards/auth.guard';

export const loginRoutes: Routes = [
  {
    path: 'forbidden',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      page: 'forbidden'
    }
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [UnAuthGuard]
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [UnAuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
