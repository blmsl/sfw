import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { AlertComponent } from '../../../shared/directives/alert/alert.component';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  @Input() passwordMinLength: number;
  @Input() passwordMaxLength: number;
  @Input() signUpStatus;
  @Input() showVerification: boolean;
  @Input() showDemoLoginMessage: boolean;

  @Output() toggleFormVisibility: EventEmitter<any> = new EventEmitter(false);
  @ViewChild('signInAlertContainer', {
    read: ViewContainerRef
  }) signInAlertContainer: ViewContainerRef;

  public form: FormGroup;
  public returnUrl: string = '/dashboard';
  public isLoading: boolean = false;
  public error: string;

  private sub: Subscription;

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
      email: ['',
        [
          Validators.email
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(this.passwordMinLength),
          Validators.maxLength(this.passwordMaxLength)
        ]
      ]
    });

    this.sub = this.route
      .queryParams
      .subscribe((params: any) => {
        // Defaults to 0 if no query param provided.
        if (params.message) {
          this.showAlert('signInAlertContainer');
          this.alertService.error(params.message);
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this.isLoading = true;
    const credentials = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.authService.signIn(credentials)
      .then(() => {
        this.isLoading = false;
        this.router.navigate([this.returnUrl]).then();
      })
      .catch((error: any) => {
        this.isLoading = false;
        this.showDemoLoginMessage = false;
        console.log(error);
        this.showAlert('signInAlertContainer');
        this.alertService.error(error.code);
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

  showAlert(target) {
    this[target].clear();
    const factory = this.cfr.resolveComponentFactory(AlertComponent);
    const ref = this[target].createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }

  socialLogin(provider: string): Promise<any> {
    const _that = this;
    this.isLoading = true;
    let loginAction;
    switch (provider) {

      case 'facebook':
        loginAction = this.authService.facebookLogin();
        break;
      case 'google':
        loginAction = this.authService.googleLogin();
        break;
      case 'twitter':
        loginAction = this.authService.twitterLogin();
        break;
    }
    return loginAction
      .then(() => {
        console.log('finished social login');
        console.log(this.returnUrl);
        return this.router.navigate([this.returnUrl])
      })
      .catch((error: any) => {
        console.log(error);
        _that.isLoading = false;
        _that.showDemoLoginMessage = false;
        _that.showAlert('signInAlertContainer');
        _that.alertService.error(error.code);
      });
  }

}
