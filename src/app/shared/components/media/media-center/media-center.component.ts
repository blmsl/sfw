import {
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnDestroy,
  Output, SimpleChanges, SimpleChange, OnChanges
} from '@angular/core';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { MediaItemService } from '../../../services/media/media-item.service';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import {
  Observable,
  Subscription
} from 'rxjs/index';
import { MediaMatcher } from '@angular/cdk/layout';
import { AlertService } from '../../../services/alert/alert.service';
import { IMediaGallery } from '../../../interfaces/media/media-gallery.interface';
import { MediaGalleryService } from '../../../services/media/media-gallery.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'media-center',
  templateUrl: 'media-center.component.html',
  styleUrls: ['media-center.component.scss']
})

export class MediaCenterComponent implements OnDestroy, OnChanges {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;
  @Input() selectedMediaItems: IMediaItem[];

  @Output() mediaItemClick = new EventEmitter<IMediaItem>();

  public mediaItems: IMediaItem[];
  public mediaGalleries$: Observable<IMediaGallery[]>;
  public mobileQuery: MediaQueryList;

  readonly _mobileQueryListener: () => void;
  private mediaItemSubscription: Subscription;
  public selectedItemsIds: string[];

  constructor(private mediaItemService: MediaItemService,
    private mediaGalleryService: MediaGalleryService,
    private alertService: AlertService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher) {

    this.mediaGalleries$ = mediaGalleryService.mediaGalleries$;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.mediaItemSubscription = mediaItemService.mediaItems$.subscribe((mediaItems: IMediaItem[]) => {
      this.mediaItems = mediaItems;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const items: SimpleChange = changes.selectedMediaItems;
    if (items){
      this.selectedItemsIds = items.currentValue.map(item => item.id);
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.mediaItemSubscription.unsubscribe();
  }

  handleMediaItemClick(mediaItem): void {
    this.mediaItemClick.emit(mediaItem);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.mediaItems, event.previousIndex, event.currentIndex);
      // this.mediaItemService.updateMediaItems(this.mediaItems).then(() => console.log('ended'));
    } else {
      console.log(event);
      /*transferArrayItem(
        event.previousContainer.selectedMediaItems,
        event.container.selectedMediaItems,
        event.previousIndex,
        event.currentIndex
      );*/
    }
  }

}
