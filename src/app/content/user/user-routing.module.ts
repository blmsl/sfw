import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserResolver } from './user.resolver';

export const userRoutes: Routes = [
  {
    path: 'list',
    component: UsersComponent,
    pathMatch: 'full'
  }/*,
  {
    path: 'edit/:userId',
    component: UserEditComponent,
    resolve: {
      user: UserResolver
    },
    pathMatch: 'full',
    children: [
      {
        path: '',
        component: UserEditMainProfileComponent
      },
      {
        path: 'articles',
        component: UserEditAssignedArticlesComponent
      },
      {
        path: 'todos',
        component: UserEditAssignedTodosComponent
      },
      {
        path: 'uploads',
        component: UserEditAssignedUploadsComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }*/,
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
