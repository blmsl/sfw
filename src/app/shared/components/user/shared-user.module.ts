import { NgModule } from '@angular/core';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { NgPipesModule } from 'ngx-pipes';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NgPipesModule,
    RouterModule
  ],
  declarations: [
    UserAvatarComponent
  ],
  exports: [
    UserAvatarComponent
  ],
  providers: []
})
export class SharedUserModule {
}
