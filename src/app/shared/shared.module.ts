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
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { MediaModule } from './components/media/media.module';
import { LoadingIndicatorModule } from './components/loading-indicator/loading-indicator.module';
import { SfwEditorModule } from './components/editor/sfw-editor.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LinkModule } from './components/links/link.module';
import { InfiniteScrollModule } from './components/infinite-scroll/infinite-scroll.module';

@NgModule({
  declarations: [
    SanitizeHtmlPipe,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    InfiniteScrollModule,
    LoadingIndicatorModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MediaModule,
    NgPipesModule,
    ReactiveFormsModule,
    LinkModule,
    NgxDatatableModule,
    SanitizeHtmlPipe,
    SfwEditorModule,
    TranslateModule
  ],
  imports: [
  ],
})
export class SharedModule {
}
