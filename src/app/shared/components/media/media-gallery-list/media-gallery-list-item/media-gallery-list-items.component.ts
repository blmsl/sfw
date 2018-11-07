import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaItemService } from '../../../../services/media/media-item.service';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IMediaItem } from '../../../../interfaces/media/media-item.interface';

@Component({
  selector: 'media-gallery-list-items',
  templateUrl: './media-gallery-list-items.component.html',
  styleUrls: ['./media-gallery-list-items.component.scss']
})
export class MediaGalleryListItemsComponent implements OnInit, OnDestroy {

  @Input() mediaItemIds: string[];
  public mediaItems: IMediaItem[];
  private mediaItemsSubscription: Subscription;

  constructor(public mediaItemService: MediaItemService) {
  }

  ngOnInit() {
    this.mediaItemsSubscription = this.mediaItemService.getMediaItemsById(this.mediaItemIds)
      .pipe(first())
      .subscribe(mediaItems => this.mediaItems = mediaItems);
  }

  ngOnDestroy() {
    this.mediaItemsSubscription.unsubscribe();
  }

}
