import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatTabsModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { MediaModule } from './components/media/media.module';
import { LoadingIndicatorModule } from './components/loading-indicator/loading-indicator.module';
import { AlertService } from './services/alert/alert.service';
import { SfwEditorModule } from './components/editor/sfw-editor.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LinkModule } from './components/links/link.module';

@NgModule({
  declarations: [
    SanitizeHtmlPipe,
    SnackbarComponent
  ],
  entryComponents: [
    SnackbarComponent
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    LoadingIndicatorModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MediaModule,
    NgPipesModule,
    ReactiveFormsModule,
    // MatSnackBarModule,
    // MediaModule,
    LinkModule,
    NgxDatatableModule,
    SanitizeHtmlPipe,
    SfwEditorModule,
    TranslateModule
  ],
  imports: [],
  providers: [
    AlertService
  ]
})
export class SharedModule {
}
