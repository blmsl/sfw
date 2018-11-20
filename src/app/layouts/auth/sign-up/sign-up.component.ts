import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../shared/interfaces/user/user.interface';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @Input() nameMinLength: number;
  @Input() passwordMinLength: number;
  @Input() passwordMaxLength: number;

  @Output() toggleFormVisibility: EventEmitter<any> = new EventEmitter(false);

  public form: FormGroup;
  public isLoading: boolean = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      passwords: this.fb.group({
        password: [
          '', [
            Validators.required,
            Validators.minLength(this.passwordMinLength),
            Validators.maxLength(this.passwordMaxLength)
          ]
        ],
        confirmPassword: [
          '', [
            Validators.required,
            Validators.minLength(this.passwordMinLength),
            Validators.maxLength(this.passwordMaxLength)
          ]
        ]
      }, {
          validator: this.passwordConfirming
        }),
      agree: [false, [Validators.required, this.validateAgreement]]
    });
  }

  onSubmit() {
    this.isLoading = true;
    const user: IUser = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      password: this.form.value.passwords.password,
      assignedRoles: {
        subscriber: true
      }
    };
    this.authService.register(user).then(() => {
      this.isLoading = false;
      this.form.reset();
      this.toggleSignUpForm();
      this.alertService.showSnackBar('success', 'Global.Register.successful');
    }).catch((error: any) => {
      this.isLoading = false;
      this.alertService.showSnackBar('success', error);
    });
  }

  togglePasswordForm() {
    this.toggleFormVisibility.emit({
      showSignInForm: false,
      showSignUpForm: false,
      showPasswordForm: true
    });
  }

  toggleSignUpForm() {
    this.toggleFormVisibility.emit({
      showSignInForm: true,
      showSignUpForm: false,
      showPasswordForm: false
    });
  }

  private validateAgreement(c: AbstractControl): { invalid: boolean } {
    if (!c.value) {
      return {
        invalid: true
      };
    }
  }

  private passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return {
        invalid: true
      };
    }
  }

}
