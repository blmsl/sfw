import {
  Component,
  EventEmitter,
  Input,
  Output
}                           from '@angular/core';
import { IUploaderConfig }  from '../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { MediaItemService } from '../../../services/media/media-item.service';
import { IMediaItem }       from '../../../interfaces/media/media-item.interface';
import { Observable }       from 'rxjs/Rx';

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

  constructor(private mediaItemService: MediaItemService) {
    this.mediaItems$ = mediaItemService.mediaItems$;
  }

  removeMediaItem(mediaItem: IMediaItem): Promise<any> {
    return this.mediaItemService.removeMediaItem(mediaItem)
      .then(() => {
        return this.mediaItemService.deleteMediaFileFromStorage(mediaItem);
      })
      .catch(error => this.uploadError.emit(error));
  }

}
