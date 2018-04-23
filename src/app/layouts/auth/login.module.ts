import { NgModule } from '@angular/core';
import { loginRoutes } from './login.routing';
import { LoginComponent } from './login.component';
import { UnAuthGuard } from '../../shared/services/auth/unauth.guard';
import { AlertComponent } from '../../shared/directives/alert/alert.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AlertService } from '../../shared/services/alert/alert.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AlertComponent,
    ForgotPasswordComponent,
    LoginComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes),
    TranslateModule
  ],
  providers: [
    AlertService,
    AuthService,
    UnAuthGuard
  ],
  entryComponents: [
    AlertComponent
  ]
})

export class LoginModule {
}
