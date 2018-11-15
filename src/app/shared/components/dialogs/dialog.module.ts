import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogConfig,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  declarations: [
    DeleteConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    DeleteConfirmDialogComponent
  ],
  entryComponents: [
    DeleteConfirmDialogComponent
  ],
  providers: [
    MatDialogConfig
  ]
})
export class DialogModule {
}
