import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BidiModule } from '@angular/cdk/bidi';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CommonModule } from '@angular/common';
import { adminRoutes } from './admin-routing';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from '../../shared/services/auth/auth.service';
import { googleMapsConfig } from '../../shared/config/google-maps.config';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationComponent } from './notification/notification.component';
import { OptionsComponent } from './options/options.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { MenuComponent } from './menu/menu.component';
import { ToggleFullscreenDirective } from '../../shared/directives/fullscreen/toggle-fullscreen.directive';
import { AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective } from '../../shared/directives/accordion';

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
    AgmCoreModule.forRoot({ apiKey: googleMapsConfig.apiKey }),
    AngularFireDatabaseModule,
    BidiModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    LoadingBarRouterModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressBarModule,
    PerfectScrollbarModule,
    RouterModule.forChild(adminRoutes),
    SharedModule
  ],
  providers: [
    AuthService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class AdminModule {
}
