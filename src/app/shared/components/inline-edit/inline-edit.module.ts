import { NgModule }            from '@angular/core';
import { InlineEditComponent } from './inline-edit.component';
import { CommonModule }        from '@angular/common';
import {
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    InlineEditComponent
  ],
  exports: [
    InlineEditComponent
  ],
  providers: []
})
export class InlineEditModule {
}
