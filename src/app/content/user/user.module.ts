import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserResolver } from './user.resolver';
import { userRoutes } from './user-routing.module';
import { UserService } from '../../shared/services/user/user.service';
import { SharedModule } from '../../shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forChild(userRoutes),
    SharedModule
  ],
  declarations: [
    UserDetailComponent,
    UsersComponent,
    UserListComponent
  ],
  providers: [
    UserResolver,
    UserService
  ]
})

export class UserModule {
}
