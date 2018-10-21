import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { AlertComponent } from '../../../shared/directives/alert/alert.component';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup;
  public isLoading: boolean = false;

  @Output() toggleFormVisibility: EventEmitter<any> = new EventEmitter(false);
  @ViewChild('forgotPasswordAlertContainer', {
    read: ViewContainerRef
  }) forgotPasswordAlertContainer: ViewContainerRef;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private cfr: ComponentFactoryResolver,
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
    this.authService.sendPasswordResetEmail(this.form.value.email)
      .then(() => {
        this.showAlert('forgotPasswordAlertContainer');
        this.alertService.success('Cool! Password recovery instruction has been sent to your email.', true);
        this.isLoading = false;
        this.form.reset();
      }).catch((error: any) => {
        this.showAlert('forgotPasswordAlertContainer');
        this.alertService.error(error);
        this.isLoading = false;
      });
  }

  showAlert(target) {
    this[target].clear();
    const factory = this.cfr.resolveComponentFactory(AlertComponent);
    const ref = this[target].createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }

}
