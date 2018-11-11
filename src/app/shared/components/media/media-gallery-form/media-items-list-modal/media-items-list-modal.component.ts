import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IUploaderConfig } from '../../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../interfaces/media/uploader-options.interface';
import { IMediaItem } from '../../../../interfaces/media/media-item.interface';
import { MediaItemService } from '../../../../services/media/media-item.service';
import { MediaItemsSelectionService } from '../../../../services/media/media-items-selection.service';
import { Observable, Subscription } from 'rxjs/index';


@Component({
  selector: 'app-media-items-list-modal',
  templateUrl: './media-items-list-modal.component.html',
  styleUrls: ['./media-items-list-modal.component.scss']
})
export class MediaItemsListModalComponent implements OnInit {

  private selectedMediaItemsSubscription: Subscription;
  public selectedMediaItems: IMediaItem[];
  public selectedItemsIds: string[];
  public mediaItems$: Observable<IMediaItem[]>;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: true,
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: [],
    itemId: '',
    queueLimit: 25,
  };

  constructor(
    private mediaItemsSelectionService: MediaItemsSelectionService,
    private mediaItemService: MediaItemService,
    public dialogRef: MatDialogRef<MediaItemsListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMediaItem[]
  ) {
    this.mediaItems$ = this.mediaItemService.mediaItems$;
    this.selectedMediaItemsSubscription = this.mediaItemsSelectionService.selectedMediaItems$
      .subscribe((items) => {
        this.selectedMediaItems = items;
        this.selectedItemsIds = items.map(item => item.id);
      });
  }

  ngOnInit() {
    console.log(this.data);
    this.mediaItemsSelectionService.initializeItemSelection(this.data);
  }

  onMediaItemClick(item: IMediaItem): void {
    this.mediaItemsSelectionService.updateMediaItemSelection(item);
  }

  onCancelClick(): void {
    this.mediaItemsSelectionService.refreshSelection();
    this.dialogRef.close(this.selectedMediaItems);
  }

  onConfirmClick(): void {
    this.dialogRef.close(this.selectedMediaItems);
  }

  ngOnDestroy(): void {
    this.selectedMediaItemsSubscription.unsubscribe();
    this.mediaItemsSelectionService.finalizeItemSelection();
  }
}
