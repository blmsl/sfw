import { NgModule } from '@angular/core';
import { loginRoutes } from './login.routing';
import { LoginComponent } from './login.component';
import { UnAuthGuard } from '../../shared/guards/unauth.guard';
import { AlertComponent } from '../../shared/directives/alert/alert.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AlertService } from '../../shared/services/alert/alert.service';
import { TranslateModule } from '@ngx-translate/core';
import { TermsOfUseComponent } from '../../shared/components/terms-of-use/terms-of-use.component';

@NgModule({
  declarations: [
    AlertComponent,
    ForgotPasswordComponent,
    LoginComponent,
    SignInComponent,
    SignUpComponent,
    TermsOfUseComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
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
