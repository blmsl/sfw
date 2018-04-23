import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreationFormComponent } from './creation-form/creation-form.component';
import { CreationDateComponent } from './creation-date/creation-date.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { UserService } from '../../services/user/user.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    NgPipesModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    CreationDateComponent,
    CreationFormComponent
  ],
  exports: [
    CreationDateComponent,
    CreationFormComponent
  ],
  providers: [
    DatePipe,
    UserService
  ]
})
export class CreationModule {
}
