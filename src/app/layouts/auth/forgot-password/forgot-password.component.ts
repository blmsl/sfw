import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup;
  public isLoading = false;

  @Output() toggleFormVisibility: EventEmitter<any> = new EventEmitter(false);

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  toggleSignInForm() {
    this.toggleFormVisibility.emit(
      {
        showSignInForm: true,
        showSignUpForm: false,
        showPasswordForm: false
      }
    );
  }

  toggleSignUpForm() {
    this.toggleFormVisibility.emit(
      {
        showSignInForm: false,
        showSignUpForm: true,
        showPasswordForm: false
      }
    );
  }

  forgotPassword() {
    this.isLoading = true;
    this.authService.sendPasswordResetEmail(this.form.value.email).then(() => {
      this.alertService.showSnackBar('success', 'auth/sendPwReminder');
      this.isLoading = false;
      this.form.reset();
    }).catch((error: any) => {
      this.alertService.showSnackBar('error', error.code);
      this.alertService.error(error);
      this.isLoading = false;
    });
  }

}
