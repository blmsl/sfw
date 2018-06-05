import { NgModule } from '@angular/core';
import { SFWEditorComponent } from './sfw-editor.component';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { MarkdownHelpComponent } from './markdown-help/markdown-help.component';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    MarkdownHelpComponent,
    SFWEditorComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    FlexLayoutModule
  ],
  exports: [
    SFWEditorComponent
  ],
  entryComponents: [
    MarkdownHelpComponent
  ]
})
export class SfwEditorModule {
}
