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
import { QuillModule } from 'ngx-quill';
import { StaticPageFormComponent } from './settings/static-pages/static-page-form/static-page-form.component';
import { CategoryService } from '../../shared/services/category/category.service';
import { CategoryTypeService } from '../../shared/services/category-type/category-type.service';
import { UserService } from '../../shared/services/user/user.service';

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
    QuillModule,
    settingsRoutingModule,
    SharedModule
  ],
  declarations: [
    SettingsComponent,
    SettingsSocialDataComponent,
    StaticPagesComponent,
    StaticPageFormComponent
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
