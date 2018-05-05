import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppModule } from './app.module';
import { OverlayModule } from "@angular/cdk/overlay";

export const APP_ID = 'sfw-app';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AngularFirestoreModule.enablePersistence(),
    AppModule,
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({
      appId: environment.appId
    }),
    BrowserTransferStateModule,
    OverlayModule
    // environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ]
})
export class AppBrowserModule {
}
