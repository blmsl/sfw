import { NgModule } from '@angular/core';
import { loginRoutes } from './login.routing';
import { LoginComponent } from './login.component';
import { UnAuthGuard } from '../../shared/guards/unauth.guard';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TermsOfUseComponent } from '../../shared/components/terms-of-use/terms-of-use.component';
import { TranslateModule } from '@ngx-translate/core';
import { SocialSigninComponent } from './social-signin/social-signin.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    ForgotPasswordComponent,
    LoginComponent,
    SignInComponent,
    SignUpComponent,
    TermsOfUseComponent,
    SocialSigninComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes),
    TranslateModule
  ],
  providers: [
    AuthService,
    UnAuthGuard
  ]
})

export class LoginModule {
}
