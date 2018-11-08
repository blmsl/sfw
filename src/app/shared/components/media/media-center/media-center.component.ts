import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { MediaItemService } from '../../../services/media/media-item.service';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from '../../../services/alert/alert.service';
import { IMediaGallery } from '../../../interfaces/media/media-gallery.interface';
import { MediaGalleryService } from '../../../services/media/media-gallery.service';
import { MediaItemInfoComponent } from '../media-item-info/media-item-info.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'media-center',
  templateUrl: 'media-center.component.html',
  styleUrls: ['media-center.component.scss']
})

export class MediaCenterComponent implements OnDestroy, OnChanges {

  @Input() selectedMediaItems: IMediaItem[];

  @Output() mediaItemClick = new EventEmitter<IMediaItem>();
  @Output() mediaItemEdit = new EventEmitter<IMediaItem>();

  public mediaItems: IMediaItem[];
  public mediaGalleries$: Observable<IMediaGallery[]>;
  public showMediaUploader = false;

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

  private mediaItemSubscription: Subscription;
  public selectedItemsIds: string[];

  constructor(private mediaItemService: MediaItemService,
              private mediaGalleryService: MediaGalleryService,
              private alertService: AlertService,
              public dialog: MatDialog) {

    this.mediaGalleries$ = mediaGalleryService.mediaGalleries$;
    this.mediaItemSubscription = mediaItemService.mediaItems$.subscribe((mediaItems: IMediaItem[]) => {
      this.mediaItems = mediaItems;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const items: SimpleChange = changes.selectedMediaItems;
    if (items) {
      this.selectedItemsIds = items.currentValue.map(item => item.id);
    }
  }

  ngOnDestroy(): void {
    this.mediaItemSubscription.unsubscribe();
  }

  showUploader() {
    this.showMediaUploader = true;
  }

  showInfoDialog(mediaItem: IMediaItem): void {
    const dialogRef = this.dialog.open(MediaItemInfoComponent, {
      data: { mediaItem }
    });

    dialogRef.afterClosed().subscribe((updatedMediaItem: IMediaItem) => {
      if (updatedMediaItem) {
        this.mediaItemService.updateMediaItem(updatedMediaItem).then(() => {
            this.mediaItemEdit.emit(updatedMediaItem);
            this.alertService.showSnackBar('success', 'general.media.upload.file.edit.saved');
          },
          (error: any) => this.alertService.showSnackBar('error', error.message)
        ).catch((error: any) => {
          this.alertService.showSnackBar('error', error.message);
        });
      }
    });
  }

  removeMediaItem(mediaItem: IMediaItem){
    this.mediaItemService.removeMediaItem(mediaItem.id).then(() => console.log('deleted'));
  }

}
