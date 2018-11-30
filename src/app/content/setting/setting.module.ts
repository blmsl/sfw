import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { settingsRoutingModule } from './setting-routing.module';
import { SettingsSocialDataComponent } from './settings/settings-social-data/settings-social-data.component';
import { StaticPagesComponent } from './settings/static-pages/static-pages.component';
import { SharedModule } from '../../shared/shared.module';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import { ApplicationService } from '../../shared/services/application/application.service';
import { ApplicationResolver } from './application.resolver';
import { StaticPageFormComponent } from './settings/static-pages/static-page-form/static-page-form.component';
import { CategoryService } from '../../shared/services/category/category.service';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { UserService } from '../../shared/services/user/user.service';
import { SettingsMainComponent } from './settings/settings-main/settings-main.component';
import { SettingsMailingComponent } from './settings/settings-mailing/settings-mailing.component';
import { SettingsDowntimeComponent } from './settings/settings-downtime/settings-downtime.component';
import { SettingsUrlshorteningComponent } from './settings/settings-urlshortening/settings-urlshortening.component';
import { SettingsCalendarsComponent } from './settings/settings-calendars/settings-calendars.component';
import { TagInputModule } from 'ngx-chips';
import { SettingsRegistrationComponent } from './settings/settings-registration/settings-registration.component';
import { SettingsSocialSignInComponent } from './settings/settings-social-sign-in/settings-social-sign-in.component';
import { SettingsSocialNetworksComponent } from './settings/settings-social-networks/settings-social-networks.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    settingsRoutingModule,
    SharedModule,
    TagInputModule
  ],
  declarations: [
    SettingsComponent,
    SettingsSocialDataComponent,
    StaticPagesComponent,
    StaticPageFormComponent,
    SettingsMainComponent,
    SettingsMailingComponent,
    SettingsDowntimeComponent,
    SettingsUrlshorteningComponent,
    SettingsCalendarsComponent,
    SettingsRegistrationComponent,
    SettingsSocialSignInComponent,
    SettingsSocialNetworksComponent
  ],
  providers: [
    ApplicationResolver,
    ApplicationService,
    CategoryService,
    CategoryTypeService,
    UserService
  ]
})
export class SettingModule {
}
