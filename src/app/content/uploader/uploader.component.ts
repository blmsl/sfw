import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUploaderConfig } from '../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../shared/interfaces/media/uploader-options.interface';
import { IMediaItem } from '../../shared/interfaces/media/media-item.interface';
import { MediaItemService } from '../../shared/services/media/media-item.service';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html'
})
export class UploaderComponent implements OnDestroy {

  private mediaItemSubscription: Subscription;
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

  public mediaItems: IMediaItem[];

  constructor(private mediaItemService: MediaItemService) {
    this.mediaItemSubscription = mediaItemService.mediaItems$.subscribe((mediaItems: IMediaItem[]) => {
      this.mediaItems = mediaItems;
    });
  }

  ngOnDestroy(): void {
    this.mediaItemSubscription.unsubscribe();
  }

}
