import { NgModule } from '@angular/core';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    UserAvatarComponent
  ],
  exports: [
    UserAvatarComponent
  ],
  providers: [
    UserService
  ]
})
export class SharedUserModule {
}
