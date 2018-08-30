import { Routes }              from '@angular/router';
import { UsersComponent }      from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserResolver }        from './user.resolver';
import { UserEditComponent }   from './user-edit/user-edit.component';

export const userRoutes: Routes = [
  {
    path: 'list',
    component: UsersComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit/:userId',
    component: UserEditComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'detail/:userId',
    component: UserDetailComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];
