import {
  Component,
  Input
}                              from '@angular/core';
import { IUploaderConfig }     from '../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions }    from '../../../interfaces/media/uploader-options.interface';
import { MediaItemService }    from '../../../services/media/media-item.service';
import { IMediaItem }          from '../../../interfaces/media/media-item.interface';
import { Observable }          from 'rxjs';
import { IMediaGallery }       from '../../../interfaces/media/media-gallery.interface';
import { MediaGalleryService } from '../../../services/media/media-gallery.service';
import { MatDialog }           from '@angular/material';

@Component({
  selector: 'media-center',
  templateUrl: 'media-center.component.html',
  styleUrls: [ 'media-center.component.scss' ]
})

export class MediaCenterComponent {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;

  @Input() mediaItems: IMediaItem[];

  public mediaGalleries$: Observable<IMediaGallery[]>;
  public showMediaUploader = false;

  constructor(private mediaItemService: MediaItemService,
              private mediaGalleryService: MediaGalleryService,
              public dialog: MatDialog) {

    this.mediaGalleries$ = mediaGalleryService.mediaGalleries$;

  }

  toggleUploader() {
    this.showMediaUploader = !this.showMediaUploader;
  }
}
