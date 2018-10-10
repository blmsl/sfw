import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { appRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFirestoreModule }  from '@angular/fire/firestore';
import { CommonModule }            from '@angular/common';
import { TimeagoModule }           from 'ngx-timeago';
import { AngularFireModule }       from '@angular/fire';
import { ServiceWorkerModule }     from '@angular/service-worker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
}                                  from '@angular/material';
import { MomentDateTimeAdapter }   from 'ng-pick-datetime-moment';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import {
  FroalaEditorModule,
  FroalaViewModule
} from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    CommonModule,
    ServiceWorkerModule.register('/ngsw-config.js', {
      enabled: environment.production
    }),
    RouterModule.forRoot(appRoutes, {
      enableTracing: environment.routerTracing
    }),
    TimeagoModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
    // GtagModule.forRoot({ trackingId: 'UA-YOUR_TRACKING_ID', trackPageviews: true })
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    { provide: DateAdapter, useClass: MomentDateTimeAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class AppModule {
}
