import {
  Component,
  Input,
  OnInit
}                     from '@angular/core';
import { IMediaItem } from '../../../../interfaces/media/media-item.interface';

@Component({
  selector: 'media-gallery-item',
  templateUrl: './media-gallery-item.component.html',
  styleUrls: ['./media-gallery-item.component.scss']
})
export class MediaGalleryItemComponent implements OnInit {

  @Input() mediaItem: IMediaItem;

  constructor() { }

  ngOnInit() {
  }

}
