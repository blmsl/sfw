import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
}                             from '@angular/core';
import {
  NavigationEnd,
  Router
}                             from '@angular/router';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
}                             from 'ngx-perfect-scrollbar';
import { AuthService }        from '../../shared/services/auth/auth.service';
import { TranslateService }   from '@ngx-translate/core';
import { Subscription }       from 'rxjs';
import { tap }                from 'rxjs/operators';
import 'moment/min/locales';
import * as moment            from 'moment';
import {
  BreakpointObserver,
  BreakpointState,
  MediaMatcher
} from '@angular/cdk/layout';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit, OnDestroy {

  private _router: Subscription;

  public url: any;
  public options = {
    collapsed: false,
    compact: false,
    boxed: false,
    dark: false,
    dir: 'ltr'
  };

  public currentLang = 'en';
  public mediaMatches: boolean;

  @ViewChild('sidemenu') sidemenu;
  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(private router: Router,
              public translate: TranslateService,
              public breakpointObserver: BreakpointObserver,
              public authService: AuthService) {

    translate.addLangs([ 'de', 'en', 'fr' ]);
    translate.setDefaultLang('de');

    const browserLang: any = translate.getBrowserLang();
    this.currentLang = browserLang.indexOf('/en|fr/') ? browserLang : 'de';
    translate.use(this.currentLang);

    if (this.currentLang === 'de') {
      moment.locale('de-de');
    }
  }

  ngOnInit(): void {
    this.url = this.router.url;

    this._router = this.router.events.pipe(
      tap((event: any) => {
        return event instanceof NavigationEnd;
      })
    ).subscribe((event: NavigationEnd) => {
      document.querySelector('.app-inner > .mat-drawer-content').scrollTop = 0;
      if (event.url) {
        this.url = event.url;
      }
      this.runOnRouteChange();
    });

    this.breakpointObserver
      .observe(['(min-width: 960px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport is 960px or over!');
        } else {
          console.log('Viewport is getting smaller!');
        }
        this.mediaMatches = state.matches;
      });
  }

  ngOnDestroy(): void {
    this._router.unsubscribe();
  }

  runOnRouteChange(): void {
    /*if (this.isOver()) {
      this.sidemenu.close();
    }*/

    this.updatePS();
  }

  receiveOptions($event): void {
    this.options = $event;
  }

  changeTranslation(currentLang: string) {
    console.log(currentLang);
    this.currentLang = currentLang;
    this.translate.use(currentLang);
  }

  isOver(): boolean {
    if (this.url === '/articles/create' || this.url.indexOf('/articles/edit') > -1 || this.url === '/calendar') {
      return false;
    }
    else if(this.mediaMatches){
      return this.mediaMatches;
    }
    else {
      return false;
    }
  }

  menuMouseOver(): void {
    if (this.mediaMatches && this.options.collapsed) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (this.mediaMatches && this.options.collapsed) {
      this.sidemenu.mode = 'side';
    }
  }

  updatePS(): void {
    if (!this.mediaMatches && !this.options.compact) {
      setTimeout(() => {
        this.directiveScroll.update();
      }, 350);
    }
  }

}
