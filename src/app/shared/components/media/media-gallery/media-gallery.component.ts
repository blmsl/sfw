import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                     from '@angular/core';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';

@Component({
  selector: 'media-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'media-gallery.component.html',
  styleUrls: [ './media-gallery.component.scss' ]
})
export class MediaGalleryComponent implements OnInit {

  @Input() mediaItems: IMediaItem[];

  @Output() removeMediaItem: EventEmitter<string> = new EventEmitter<string>(false);

  constructor() {
  }

  ngOnInit() {
  }
}
