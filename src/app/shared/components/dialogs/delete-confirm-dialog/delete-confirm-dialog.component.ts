import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss']
})
export class DeleteConfirmDialogComponent {

  @HostListener('keydown.esc')
  public onEsc() {
    this.onCancelClick();
  }

  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.delete();
    this.dialogRef.close();
  }


  public delete() {
    console.log(this.data);
  }

}
