import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: environment.appId }),
    RouterModule.forRoot(appRoutes, { enableTracing: environment.routerTracing }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    TransferHttpCacheModule,
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
