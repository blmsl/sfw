import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { MediaItemService } from '../../../services/media/media-item.service';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { Observable } from 'rxjs/Rx';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'media-center',
  templateUrl: 'media-center.component.html',
  styleUrls: [
    'media-center.component.scss'
  ]
})

export class MediaCenterComponent implements OnDestroy {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;
  @Output() uploadCompleted: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() uploadError: EventEmitter<any> = new EventEmitter<any>(false);

  public mediaItems$: Observable<IMediaItem[]>;
  public mobileQuery: MediaQueryList;

  readonly _mobileQueryListener: () => void;

  constructor(private mediaItemService: MediaItemService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public snackBar: MatSnackBar) {
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
      .then(() => {
        return this.mediaItemService.deleteMediaFileFromStorage(mediaItem);
      })
      .then(() => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            status: 'success',
            message: 'general.media.uploader.removedFile'
          },
          duration: 2500
        });
      })
      .catch(error => this.uploadError.emit(error));
  }

}
