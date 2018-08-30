import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserResolver } from './user.resolver';
import { userRoutes } from './user-routing.module';
import { UserService } from '../../shared/services/user/user.service';
import { SharedModule } from '../../shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditMainComponent } from './user-edit/user-edit-main/user-edit-main.component';
import { UserEditRolesComponent } from './user-edit/user-edit-roles/user-edit-roles.component';
import { AssignedRolesFilterPipe } from '../../shared/pipes/assigned-roles-filter.pipe';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forChild(userRoutes),
    SharedModule
  ],
  declarations: [
    AssignedRolesFilterPipe,
    UserDetailComponent,
    UsersComponent,
    UserListComponent,
    UserEditComponent,
    UserEditMainComponent,
    UserEditRolesComponent
  ],
  providers: [
    UserResolver,
    UserService
  ]
})

export class UserModule {
}
