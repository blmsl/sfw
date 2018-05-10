import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { MediaItemService } from '../../../services/media/media-item.service';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'media-center',
  templateUrl: 'media-center.component.html',
  styleUrls: [
    'media-center.component.css'
  ]
})

export class MediaCenterComponent implements OnInit {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;
  @Output() uploadCompleted: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  public mediaItems$: Observable<IMediaItem[]>;

  constructor(private mediaItemService: MediaItemService) {
    this.mediaItems$ = mediaItemService.mediaItems$;

  }

  ngOnInit() {
  }

  removeMediaItem(mediaItem: IMediaItem) {
    this.mediaItemService.removeMediaItem(mediaItem).then(() => {
      this.mediaItemService.deleteMediaFileFromStorage(mediaItem);
    })
      .catch(error => console.log(error));
  }

}
