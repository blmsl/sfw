import { NgModule }                  from '@angular/core';
import { FlexLayoutModule }          from '@angular/flex-layout';
import { FormsModule }               from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule
}                                    from 'ngx-perfect-scrollbar';
import { SharedModule }              from '../../shared/shared.module';
import { RouterModule }              from '@angular/router';
import { AdminComponent }            from './admin.component';
import { CommonModule }              from '@angular/common';
import { adminRoutes }               from './admin-routing';
import { AuthService }               from '../../shared/services/auth/auth.service';
import { HeaderComponent }           from './header/header.component';
import { SidebarComponent }          from './sidebar/sidebar.component';
import { NotificationComponent }     from './notification/notification.component';
import { OptionsComponent }          from './options/options.component';
import { LoadingBarRouterModule }    from '@ngx-loading-bar/router';
import { MenuComponent }             from './menu/menu.component';
import { ToggleFullscreenDirective } from '../../shared/directives/fullscreen/toggle-fullscreen.directive';
import {
  AccordionAnchorDirective,
  AccordionDirective,
  AccordionLinkDirective
}                                    from '../../shared/directives/accordion';
import { BackendGuard }              from '../../shared/guards/backend.guard';
import { AdminGuard }                from '../../shared/guards/admin.guard';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { TimeagoModule }             from 'ngx-timeago';
import { TranslateModule }           from '@ngx-translate/core';
import {
  FroalaEditorModule,
  FroalaViewModule
} from 'angular-froala-wysiwyg';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AccordionDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    NotificationComponent,
    OptionsComponent,
    MenuComponent,
    ToggleFullscreenDirective
  ],
  imports: [
    //AgmCoreModule.forRoot({ apiKey: googleMapsConfig.apiKey }),
    AngularFireDatabaseModule,
    FormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    LoadingBarRouterModule,
    MatListModule,
    MatMenuModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    PerfectScrollbarModule,
    RouterModule.forChild(adminRoutes),
    SharedModule,
    TimeagoModule.forRoot()
    // GtagModule.forRoot({ trackingId: 'UA-YOUR_TRACKING_ID', trackPageviews: true }) */
  ],
  providers: [
    AuthService,
    AdminGuard,
    BackendGuard,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AdminModule {
}
