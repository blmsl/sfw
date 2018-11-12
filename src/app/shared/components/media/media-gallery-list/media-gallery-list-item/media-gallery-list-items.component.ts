import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaItemService } from '../../../../services/media/media-item.service';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IMediaItem } from '../../../../interfaces/media/media-item.interface';
import { IMediaGallery } from '../../../../interfaces/media/media-gallery.interface';

@Component({
  selector: 'media-gallery-list-items',
  templateUrl: './media-gallery-list-items.component.html',
  styleUrls: ['./media-gallery-list-items.component.scss']
})
export class MediaGalleryListItemsComponent implements OnInit, OnDestroy {

  @Input() mediaGallery: IMediaGallery;
  @Input() showCoverBtn: boolean;
  public mediaItems: IMediaItem[];
  private mediaItemsSubscription: Subscription;

  constructor(public mediaItemService: MediaItemService) {
  }

  ngOnInit() {
    if(this.mediaGallery.assignedMediaItems) {
      this.mediaItemsSubscription = this.mediaItemService.getMediaItemsById(this.mediaGallery.assignedMediaItems)
        .pipe(first())
        .subscribe(mediaItems => this.mediaItems = mediaItems);
    }
  }

  ngOnDestroy() {
    this.mediaItemsSubscription.unsubscribe();
  }

}
