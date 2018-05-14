import {
  Component,
  EventEmitter,
  Input,
  Output
}                            from '@angular/core';
import { IUploaderConfig }   from '../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions }  from '../../../interfaces/media/uploader-options.interface';
import { MediaItemService }  from '../../../services/media/media-item.service';
import { IMediaItem }        from '../../../interfaces/media/media-item.interface';
import { Observable }        from 'rxjs/Rx';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { MatSnackBar }       from '@angular/material';

@Component({
  selector: 'media-center',
  templateUrl: 'media-center.component.html',
  styleUrls: [
    'media-center.component.scss'
  ]
})

export class MediaCenterComponent {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;
  @Output() uploadCompleted: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() uploadError: EventEmitter<any> = new EventEmitter<any>(false);

  public mediaItems$: Observable<IMediaItem[]>;

  constructor(private mediaItemService: MediaItemService,
              public snackBar: MatSnackBar) {
    this.mediaItems$ = mediaItemService.mediaItems$;
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
