import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { MediaItemService } from '../../../services/media/media-item.service';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { Observable } from 'rxjs/index';
import { MediaMatcher } from '@angular/cdk/layout';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'media-center',
  templateUrl: 'media-center.component.html',
  styleUrls: ['media-center.component.scss']
})

export class MediaCenterComponent implements OnDestroy {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;

  public mediaItems$: Observable<IMediaItem[]>;
  public mobileQuery: MediaQueryList;

  readonly _mobileQueryListener: () => void;

  constructor(private mediaItemService: MediaItemService,
    private alertService: AlertService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.mediaItems$ = mediaItemService.mediaItems$;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  removeMediaItem(mediaItem: IMediaItem): void {
    console.log(mediaItem);
    /* this.mediaItemService.removeMediaItem(mediaItem.itemId)
      .then(() => this.alertService.showSnackBar('success', 'general.media.uploader.removedFile'))
      .catch(error => this.alertService.showSnackBar('error', error.message)); */
  }

}
