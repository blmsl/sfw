import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { IMediaGallery } from '../../../interfaces/media/media-gallery.interface';

@Component({
  selector: 'media-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent implements OnInit {

  @Input() mediaItems: IMediaItem[];
  @Input() mediaGalleries: IMediaGallery[];
  @Input() currentMediaGallery: string;

  @Output() removeMediaItem: EventEmitter<IMediaItem> = new EventEmitter<IMediaItem>(false);
  @Output() drop: EventEmitter<any> = new EventEmitter<any>(false);

  public connectedGalleries: string[] = [];

  constructor() {
  }

  ngOnInit() {
    this.mediaGalleries.forEach((mediaGallery: IMediaGallery) => {
      this.connectedGalleries.push(mediaGallery.id);
    });
  }

}
