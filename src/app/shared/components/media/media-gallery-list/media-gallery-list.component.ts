import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'media-gallery-list',
  templateUrl: './media-gallery-list.component.html'
})
export class MediaGalleryListComponent implements OnInit {

  // @Input() assignedGalleries: IMediaGallery[];
  // @Input() items: IMediaItem[];
  @Input() assignedItem: any;

  @Output() setMediaGallery = new EventEmitter(false);
  @Output() removeMediaGallery = new EventEmitter(false);

  ngOnInit() {
  }

  constructor() {
  }
}
