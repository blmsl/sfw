import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from './app.module';
import { OverlayModule } from "@angular/cdk/overlay";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';

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
    OverlayModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    // environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ]
})
export class AppBrowserModule {
}
