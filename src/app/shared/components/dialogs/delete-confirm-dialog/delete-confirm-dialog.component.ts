import { ChangeDetectionStrategy, Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatCheckboxChange, MatDialogRef } from '@angular/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss']
})
export class DeleteConfirmDialogComponent implements OnInit {

  @HostListener('keydown.esc')
  public onEsc() {
    this.onCancelClick();
  }

  public deleteFromFS: boolean = false;
  public showDeleteCheckbox: boolean = false;

  constructor(private dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    if (this.data.mediaGallery) {
      this.showDeleteCheckbox = true;
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close({
      removedMediaItem: this.data.mediaItem,
      deleteFromFS: this.showDeleteCheckbox ? this.deleteFromFS : true
    });
  }

  setDeleteFromFS($event: MatCheckboxChange): void {
    this.deleteFromFS = $event.checked;
  }


}
