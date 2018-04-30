import { RouterModule }              from '@angular/router';
import { NgModule }                  from '@angular/core';
import { appRoutes }                 from './app.routing';
import { AppComponent }              from './app.component';
import { environment }               from '../environments/environment';
import { AngularFirestoreModule }    from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule }         from 'angularfire2';
import { CommonModule }              from '@angular/common';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // .enablePersistence(),
    AngularFireDatabaseModule,
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: environment.routerTracing })
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
