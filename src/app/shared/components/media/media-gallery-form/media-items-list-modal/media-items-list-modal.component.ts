import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IUploaderConfig } from '../../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../interfaces/media/uploader-options.interface';
import { IMediaItem } from '../../../../interfaces/media/media-item.interface';


@Component({
  selector: 'app-media-items-list-modal',
  templateUrl: './media-items-list-modal.component.html',
  styleUrls: ['./media-items-list-modal.component.scss']
})
export class MediaItemsListModalComponent implements OnInit {

  @Output() assignedMediaItem = new EventEmitter<IMediaItem>();

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    showHeader: false
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: [],
    itemId: '',
    queueLimit: 5,
  };

  constructor(public dialogRef: MatDialogRef<MediaItemsListModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string[]) {
  }

  ngOnInit() {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onMediaItemClick(mediaItem: IMediaItem): void {
    this.assignedMediaItem.emit(mediaItem);
  }
}
