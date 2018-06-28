import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { LinkModule } from './components/links/link.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { SubmitIfValidDirective } from './directives/submit/submit-if-valid.directive';
import { MediaModule } from './components/media/media.module';
import { LoadingIndicatorModule } from './components/loading-indicator/loading-indicator.module';
import { AlertService } from './services/alert/alert.service';

@NgModule({
  declarations: [
    SanitizeHtmlPipe,
    SnackbarComponent,
    SubmitIfValidDirective
  ],
  entryComponents: [
    SnackbarComponent
  ],
  exports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatSnackBarModule,
    MediaModule,
    FlexLayoutModule,
    LoadingIndicatorModule,
    LinkModule,
    NgPipesModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SanitizeHtmlPipe,
    TranslateModule
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MediaModule
  ],
  providers: [
    AlertService
  ]
})
export class SharedModule {
}
