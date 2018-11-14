import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';

@NgModule({
  declarations: [
    DeleteConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    DeleteConfirmDialogComponent
  ],
  entryComponents: [
    DeleteConfirmDialogComponent
  ]
})
export class DialogModule {
}
