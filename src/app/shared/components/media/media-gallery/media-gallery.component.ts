import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';

@Component({
  selector: 'media-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent implements OnInit {

  @Input() mediaItems: IMediaItem[];
  @Output() removeMediaItem: EventEmitter<IMediaItem> = new EventEmitter<IMediaItem>(false);

  public breakpoint: number;

  constructor() {
  }

  ngOnInit() {
    this.breakpoint = (window.screen.width <= 600) ? 1 : (window.screen.width <= 1024) ? 2 : 3;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : (event.target.innerWidth <= 1024) ? 2 : 3;
  }
}
