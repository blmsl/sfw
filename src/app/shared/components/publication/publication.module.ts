import { NgModule } from '@angular/core';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import { UserService } from '../../services/user/user.service';
import { SharedModule } from '../../shared.module';
// import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  imports: [
    // AmazingTimePickerModule,
    SharedModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  declarations: [
    PublicationFormComponent
  ],
  exports: [
    PublicationFormComponent
  ],
  providers: [
    UserService
  ]
})
export class PublicationModule {
}
