import { Component, EventEmitter, Inject, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IUploaderConfig } from '../../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../interfaces/media/uploader-options.interface';
import { IMediaItem } from '../../../../interfaces/media/media-item.interface';
import { MediaItemService } from '../../../../services/media/media-item.service';
import { AlertService } from '../../../../services/alert/alert.service';


@Component({
  selector: 'app-media-items-list-modal',
  templateUrl: './media-items-list-modal.component.html',
  styleUrls: ['./media-items-list-modal.component.scss']
})
export class MediaItemsListModalComponent implements OnInit {

  @Output() assignedMediaItem = new EventEmitter<IMediaItem[]>();


  public selectedMediaItems: IMediaItem[];

  constructor(private alertService: AlertService,
              private mediaItemService: MediaItemService,
              public dialogRef: MatDialogRef<MediaItemsListModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IMediaItem[]
  ) {
    this.selectedMediaItems = this.data;
  }

  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onMediaItemClick(mediaItem: IMediaItem): void {
    const findMediaItem = item => item.id !== mediaItem.id;
    if (this.selectedMediaItems.every(findMediaItem)) {
      this.selectedMediaItems = [...this.selectedMediaItems, mediaItem];
    } else {
      this.selectedMediaItems = this.selectedMediaItems.filter(findMediaItem);
    }
    this.assignedMediaItem.emit(this.selectedMediaItems);
  }
}
