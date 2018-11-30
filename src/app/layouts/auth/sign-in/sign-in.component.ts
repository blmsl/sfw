import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {

  @Input() passwordMinLength: number;
  @Input() passwordMaxLength: number;
  @Input() signUpStatus;
  @Input() showVerification: boolean;
  @Input() showDemoLoginMessage: boolean;

  @Output() toggleFormVisibility: EventEmitter<any> = new EventEmitter(false);

  public form: FormGroup;
  public returnUrl = '/dashboard';
  public isLoading = false;
  public error: string;

  constructor(private alertService: AlertService,
              public authService: AuthService,
              private cfr: ComponentFactoryResolver,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.form = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength), Validators.maxLength(this.passwordMaxLength)]]
    });
  }


  onSubmit() {
    this.isLoading = true;
    const credentials = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.authService.signIn(credentials).then(() => {
      this.isLoading = false;
      return this.router.navigate([this.returnUrl]);
    }).catch((error: any) => {
      this.isLoading = false;
      this.alertService.showSnackBar('error', error.code);
    });
  }

  togglePasswordForm() {
    this.toggleFormVisibility.emit(
      {
        showSignInForm: false,
        showSignUpForm: false,
        showPasswordForm: true
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

  updateLoadingIndicator($event: boolean) {
    this.isLoading = $event;
  }

}
