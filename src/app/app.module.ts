import { RouterModule }           from '@angular/router';
import { NgModule }               from '@angular/core';
import { appRoutes }              from './app.routing';
import { AppComponent }           from './app.component';
import { environment }            from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule }      from 'angularfire2';
import { CommonModule }           from '@angular/common';
import { TimeagoModule }          from 'ngx-timeago';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    CommonModule,
    /* ServiceWorkerModule.register("/ngsw-worker.js", {
     enabled: environment.production
     }),*/
    RouterModule.forRoot(appRoutes, {
      enableTracing: environment.routerTracing
    }),
    TimeagoModule.forRoot()
    // GtagModule.forRoot({ trackingId: 'UA-YOUR_TRACKING_ID', trackPageviews: true })
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
