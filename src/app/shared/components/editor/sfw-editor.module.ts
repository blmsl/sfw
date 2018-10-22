import { NgModule }              from '@angular/core';
import {
  FroalaEditorModule,
  FroalaViewModule
} from 'angular-froala-wysiwyg';
import { MatDialogModule }       from '@angular/material';

@NgModule({
  declarations: [
  ],
  imports: [
    FroalaViewModule,
    MatDialogModule
  ],
  exports: [
    FroalaEditorModule,
    FroalaViewModule
  ]
})
export class SfwEditorModule {
}
