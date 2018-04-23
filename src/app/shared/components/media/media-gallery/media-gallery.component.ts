import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { MediaItemService } from '../../../services/media/media-item.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'media-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'media-gallery.component.html'
})
export class MediaGalleryComponent implements OnInit {

  @Input() id: string;
  @Input() path: string;

  public mediaItems: Observable<IMediaItem[]>;

  constructor(private mediaItemService: MediaItemService) {
    this.mediaItems = mediaItemService.mediaItems$;
  }

  ngOnInit() {
  }

  /*
  removeMediaGallery(gallery: IMediaGallery) {
    console.log(gallery);
  }

  updateMediaItem(item: IMediaItem) {
    this.mediaItemService.updateMediaItem(item.id, item);
  }

  removeMediaItem(item: IMediaItem) {
    this.mediaItemService.removeMediaItem(item);
  }
  */
}
