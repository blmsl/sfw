import {
  Component,
  EventEmitter,
  Input,
  Output
}                     from '@angular/core';
import { IMediaItem } from '../../../../interfaces/media/media-item.interface';

@Component({
  selector: 'media-gallery-item',
  templateUrl: './media-gallery-item.component.html',
  styleUrls: [ './media-gallery-item.component.scss' ]
})
export class MediaGalleryItemComponent {

  @Input() mediaItem: IMediaItem;
  // @Input() assignedGalleries: IMediaGallery[];

  @Output() removeMediaItem = new EventEmitter(false);
  @Output() updateMediaItem = new EventEmitter(false);

  constructor() {
  }

  /*
   moveItemToGallery(item: IMediaItem) {
   item.assignedItemGallery = this.selectedGallery ? this.selectedGallery : '';
   this.updateMediaItem.emit(item);
   }

   setSelectedItem(item: IMediaItem) {
   this.selectedItem = item;
   } */

}

