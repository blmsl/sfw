import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  TranslateLoader,
  TranslateModule
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { mainRoutes } from './main.routing';
import { environment } from '../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { AuthService } from '../../shared/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UnAuthGuard } from '../../shared/guards/unauth.guard';
import { AlertService } from '../../shared/services/alert/alert.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(mainRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [],
  providers: [
    AlertService,
    AngularFireAuth,
    AuthGuard,
    AuthService,
    UnAuthGuard
  ]
})
export class MainModule {
}
