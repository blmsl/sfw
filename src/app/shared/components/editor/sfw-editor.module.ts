import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { MarkdownHelpComponent } from './markdown-help/markdown-help.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    MarkdownHelpComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    FlexLayoutModule
  ],
  entryComponents: [
    MarkdownHelpComponent
  ]
})
export class SfwEditorModule {
}
