import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { MediaItemService } from '../../../services/media/media-item.service';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { Observable } from 'rxjs/index';
import { MediaMatcher } from '@angular/cdk/layout';
import { AlertService } from '../../../services/alert/alert.service';
import { IMediaGallery } from '../../../interfaces/media/media-gallery.interface';
import { MediaGalleryService } from '../../../services/media/media-gallery.service';

@Component({
  selector: 'media-center',
  templateUrl: 'media-center.component.html',
  styleUrls: ['media-center.component.scss']
})

export class MediaCenterComponent implements OnDestroy {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;

  public mediaItems$: Observable<IMediaItem[]>;
  public mediaGalleries$: Observable<IMediaGallery[]>;
  public mobileQuery: MediaQueryList;

  readonly _mobileQueryListener: () => void;

  constructor(private mediaItemService: MediaItemService,
    private mediaGalleryService: MediaGalleryService,
    private alertService: AlertService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher) {

    this.mediaGalleries$ = mediaGalleryService.mediaGalleries$;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.mediaItems$ = mediaItemService.mediaItems$;

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  removeMediaItem(mediaItem: IMediaItem): void {
    this.mediaItemService.removeMediaItem(mediaItem)
      .then(() => this.alertService.showSnackBar('success', 'general.media.uploader.removedFile'))
      .catch(error => this.alertService.showSnackBar('error', error.message));
  }

}
