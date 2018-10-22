import { NgModule }                from '@angular/core';
import { AppComponent }            from './app.component';
import { environment }             from '../environments/environment';
import { BrowserModule }           from '@angular/platform-browser';
import { RouterModule }            from '@angular/router';
import { appRoutes }               from './app.routing';
import { ServiceWorkerModule }     from '@angular/service-worker';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({
      appId: environment.appId
    }),
    ServiceWorkerModule.register('/ngsw-config.js', {
      enabled: environment.production
    }),
    RouterModule.forRoot(appRoutes, {
      enableTracing: environment.routerTracing
    }),
    TransferHttpCacheModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    /* { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
     { provide: DateAdapter, useClass: MomentDateTimeAdapter, deps: [ MAT_DATE_LOCALE ] },
     { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS } */
  ]
})
export class AppModule {
}
