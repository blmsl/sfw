import { CommonModule }        from '@angular/common';
import {
  HttpClient,
  HttpClientModule
}                              from '@angular/common/http';
import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';
import {
  TranslateLoader,
  TranslateModule
}                              from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireAuth }     from 'angularfire2/auth';
import { AuthGuard }           from '../../shared/guards/auth.guard';
import { AuthService }         from '../../shared/services/auth/auth.service';
import { UnAuthGuard }         from '../../shared/guards/unauth.guard';
import { mainRoutes }          from './main.routing';

 export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(mainRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    })
  ],
  declarations: [],
  providers: [
    AngularFireAuth,
    AuthGuard,
    AuthService,
    UnAuthGuard
  ]
})
export class MainModule {
}
