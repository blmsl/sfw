import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { Router } from '@angular/router';
import { ApplicationService } from '../../../shared/services/application/application.service';
import { Observable } from 'rxjs/index';
import { IApplication } from '../../../shared/interfaces/application.interface';

@Component({
  selector: 'social-signin',
  templateUrl: './social-signin.component.html',
  styleUrls: ['./social-signin.component.scss']
})
export class SocialSigninComponent implements OnInit {

  @Output() updateLoadingIndicator: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  public application$: Observable<IApplication[]>;

  constructor(private authService: AuthService,
              private applicationService: ApplicationService,
              private router: Router,
              private alertService: AlertService) {
    this.application$ = this.applicationService.getCurrentApplication();
  }

  ngOnInit() {
  }

  socialLogin(provider: string) {

    this.updateLoadingIndicator.emit(true);
    let loginAction;

    switch (provider) {

      case 'Facebook':
        loginAction = this.authService.facebookLogin();
        break;
      case 'Github':
        loginAction = this.authService.githubLogin();
        break;
      case 'Google':
        loginAction = this.authService.googleLogin();
        break;
      case 'Twitter':
        loginAction = this.authService.twitterLogin();
        break;
    }

    loginAction.then(() => {
      return this.router.navigate(['dashboard']);
    }).catch((error: any) => {
      this.updateLoadingIndicator.emit(false);
      console.log(error);
      this.alertService.showSnackBar('error', error.code);
    });
  }

}
