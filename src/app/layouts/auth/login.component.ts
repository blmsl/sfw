import {
  Component,
  OnInit
}                           from '@angular/core';
import {
  zoomIn,
  zoomOut
}                           from 'ng-animate';
import {
  state,
  style,
  transition,
  trigger,
  useAnimation
}                           from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute }   from '@angular/router';

@Component({
  selector: 'app-layout',
  styles: [ ':host .mat-drawer-content {padding: 0;} .mat-drawer-container {z-index: 1000}' ],
  styleUrls: [
    'login.component.scss'
  ],
  templateUrl: './login.component.html',
  animations: [
    trigger('authAnimation', [
      state('1', style({
        opacity: 1,
        transform: 'scale(1.0)'
      })),
      state('0', style({
        opacity: 0,
        transform: 'scale(0.0)'
      })),
      transition('1 => 0', useAnimation(zoomOut)),
      transition('0 => 1', useAnimation(zoomIn))
    ])
  ]
})
export class LoginComponent implements OnInit {

  public loading: boolean = false;
  public nameMinLength: number = 5;
  public passwordMinLength: number = 5;
  public passwordMaxLength: number = 25;

  public showSignInForm: boolean = true;
  public showSignUpForm: boolean = false;
  public showPasswordForm: boolean = false;

  public signUpStatus;
  public currentLang = 'en';

  constructor(private route: ActivatedRoute, private translate: TranslateService) {
    translate.addLangs([ 'de', 'en', 'fr' ]);
    translate.setDefaultLang('de');

    const browserLang: string = translate.getBrowserLang();
    this.currentLang = browserLang.match(/en|fr/) ? browserLang : 'de';
    translate.use(this.currentLang);
  }

  ngOnInit() {
  }

  toggleFormVisibility($event: any[]) {
    for (const key in $event) {
      this[ key ] = $event[ key ];
    }
  }

}
