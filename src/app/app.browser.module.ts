import { NgModule }                from '@angular/core';
import { AppComponent }            from './app.component';
import {
  BrowserModule,
  BrowserTransferStateModule
}                                  from '@angular/platform-browser';
import { environment }             from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule }     from '@angular/service-worker';
import {
  AngularFirestore,
  AngularFirestoreModule
}                                  from 'angularfire2/firestore';
import { AppModule }               from './app.module';

export const APP_ID = 'sfw-app';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    AngularFirestoreModule,
    AppModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({
      appId: environment.appId
    }),
    BrowserTransferStateModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ]
})
export class AppBrowserModule {
  constructor(private afs: AngularFirestore) {
    console.log('App-Module: Firestore .enablePersistence() is off');
    const firestore = afs.app.firestore();
    // firebase.firestore.setLogLevel('debug');
    const settings = {
      timestampsInSnapshots: true
    };
    firestore.settings(settings);
  }
}
