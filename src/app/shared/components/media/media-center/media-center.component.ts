import { Component, Input, OnDestroy } from '@angular/core';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { MediaItemService } from '../../../services/media/media-item.service';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { Observable, Subscription } from 'rxjs';
import { AlertService } from '../../../services/alert/alert.service';
import { IMediaGallery } from '../../../interfaces/media/media-gallery.interface';
import { MediaGalleryService } from '../../../services/media/media-gallery.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'media-center',
  templateUrl: 'media-center.component.html',
  styleUrls: ['media-center.component.scss']
})

export class MediaCenterComponent implements OnDestroy {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;

  public mediaItems: IMediaItem[];
  public mediaGalleries$: Observable<IMediaGallery[]>;
  public showMediaUploader = false;

  private mediaItemSubscription: Subscription;

  constructor(private mediaItemService: MediaItemService,
              private mediaGalleryService: MediaGalleryService,
              private alertService: AlertService,
              public dialog: MatDialog) {

    this.mediaGalleries$ = mediaGalleryService.mediaGalleries$;
    this.mediaItemSubscription = mediaItemService.mediaItems$.subscribe((mediaItems: IMediaItem[]) => {
      this.mediaItems = mediaItems;
    });
  }

  ngOnDestroy(): void {
    this.mediaItemSubscription.unsubscribe();
  }

  showUploader() {
    this.showMediaUploader = true;
  }
}
