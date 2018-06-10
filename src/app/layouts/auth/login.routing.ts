import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { UnAuthGuard } from '../../shared/guards/unauth.guard';
import { ForbiddenComponent } from '../admin/forbidden/forbidden.component';

export const loginRoutes: Routes = [
  /*{
    path: 'forgot',
    component: ForgotComponent
  },
  {
    path: 'lockscreen',
    component: LockscreenComponent
  },*/
  {
    path: '',
    component: LoginComponent,
    canActivate: [UnAuthGuard]
  },
  /*{
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [UnAuthGuard]
  },*/
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
