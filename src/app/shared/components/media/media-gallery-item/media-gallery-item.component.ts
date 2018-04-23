import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'media-gallery-item',
  templateUrl: 'media-gallery-item.component.html',
  styleUrls: [
    'media-gallery-item.component.scss'
  ]
})

export class MediaGalleryItemComponent {

  // @Input() item: IMediaItem;
  // @Input() assignedGalleries: IMediaGallery[];

  @Output() removeMediaItem = new EventEmitter(false);
  @Output() updateMediaItem = new EventEmitter(false);
  public selectedGallery: string;
  // public selectedItem: IMediaItem;

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
