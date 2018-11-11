import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs/index';
import { IMediaItem } from '../../interfaces/media/media-item.interface';
import { MediaItemService } from './media-item.service';

@Injectable()
export class MediaItemsSelectionService {

  private selectedMediaItems: BehaviorSubject<IMediaItem[]> = new BehaviorSubject<IMediaItem[]>([]);
  private mediaItemsSubscription: Subscription;
  private initialData: IMediaItem[];
  public selectedMediaItems$ = this.selectedMediaItems.asObservable();

  constructor(private mediaItemService: MediaItemService) {

  }

  updateMediaItemSelection(mediaItem: IMediaItem) {
    const prevSelection = this.selectedMediaItems.getValue();
    prevSelection.find(item => item.id === mediaItem.id) ?
      this.selectedMediaItems.next(prevSelection.filter(item => item.id !== mediaItem.id)) :
      this.selectedMediaItems.next([...prevSelection, mediaItem]);
  }

  initializeItemSelection(mediaItems: IMediaItem[]) {
    this.initialData = mediaItems;
    this.selectedMediaItems.next(mediaItems);

    this.mediaItemsSubscription = this.mediaItemService.mediaItems$.subscribe(items => {
      const availableMediaItems = items;

      this.selectedMediaItems.next(this.selectedMediaItems.value
        .filter(item => availableMediaItems.find(updatedItem => item.id === updatedItem.id))
        .map(item => availableMediaItems.find(updatedItem => updatedItem.id === item.id)));
      this.initialData = this.initialData
        .filter(item => availableMediaItems.find(updatedItem => item.id === updatedItem.id))
        .map(item => availableMediaItems.find(updatedItem => updatedItem.id === item.id));
    });

  }

  finalizeItemSelection() {
    this.mediaItemsSubscription.unsubscribe();
  }

  refreshSelection() {
    this.selectedMediaItems.next(this.initialData);
  }

}
