import { RouterModule }            from '@angular/router';
import { NgModule }                from '@angular/core';
import { appRoutes }                 from './app.routing';
import { AppComponent }              from './app.component';
import {
  BrowserModule,
  BrowserTransferStateModule
}                                    from '@angular/platform-browser';
import { environment }               from '../environments/environment';
import { BrowserAnimationsModule }   from '@angular/platform-browser/animations';
import { ServiceWorkerModule }       from '@angular/service-worker';
import {
  AngularFirestore,
  AngularFirestoreModule
}                                    from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule }         from 'angularfire2';
import * as firebase                 from 'firebase';

export const APP_ID = 'sfw-app';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // .enablePersistence(),
    AngularFireDatabaseModule,
    BrowserModule.withServerTransition({
      appId: APP_ID
    }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    RouterModule.forRoot(appRoutes, { enableTracing: environment.routerTracing })
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(private afs: AngularFirestore){
    console.log('App-Module: Firestore .enablePersistence() is off');
    const firestore = afs.app.firestore();
    // firebase.firestore.setLogLevel('debug');
    const settings = {
      timestampsInSnapshots: true
    };
    firestore.settings(settings);
  }
}
