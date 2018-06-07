import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
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

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

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
  public returnUrl: string = '';
  public isLoading: boolean = false;
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
    }
    return loginAction
      .then(() => {
        return this.router.navigate([this.returnUrl])
      })
      .catch((error: any) => {
        _that.isLoading = false;
        _that.showDemoLoginMessage = false;
        _that.showAlert('signInAlertContainer');
        _that.alertService.error(error.code);
      });
  }

}
