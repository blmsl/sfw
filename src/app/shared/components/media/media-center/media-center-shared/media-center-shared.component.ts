import { Component, Input, OnInit } from '@angular/core';
import { IUploaderConfig } from '../../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../interfaces/media/uploader-options.interface';
import { IMediaGalleryFormOptions } from '../../../../interfaces/media/media-gallery-form-options.interface';
import { Observable } from 'rxjs/index';
import { IMediaItem } from '../../../../interfaces/media/media-item.interface';
import { IMediaGallery } from '../../../../interfaces/media/media-gallery.interface';
import { MediaItemService } from '../../../../services/media/media-item.service';
import { MediaGalleryService } from '../../../../services/media/media-gallery.service';
import { first } from 'rxjs/internal/operators';


@Component({
  selector: 'media-center-shared',
  templateUrl: './media-center-shared.component.html',
  styleUrls: ['./media-center-shared.component.scss']
})
export class MediaCenterSharedComponent implements OnInit {

  @Input() id: string;
  @Input() itemType: string;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: true,
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: [],
    itemId: '',
    queueLimit: 5,
  };

  public mediaGalleryFormOptions: IMediaGalleryFormOptions = {
    disabledAssignedItem: true,
    draggableList: true,
    redirect: false
  };

  public mediaItems$: Observable<IMediaItem[]>;
  public mediaGalleries$: Observable<IMediaGallery[]>;
  public gallery: IMediaGallery;

  constructor(private mediaItemService: MediaItemService,
              private mediaGalleryService: MediaGalleryService) {
  }

  ngOnInit() {

      this.uploaderOptions.itemId = this.id;
      // this.uploaderOptions.assignedObjects = [this.itemType];
      this.mediaItems$ = this.mediaItemService.getMediaItems([], this.id);
      this.mediaGalleries$ = this.mediaGalleryService.getAssignedGalleries(this.id);

      this.mediaGalleryService.setNewGallery().pipe(first()).subscribe((gallery: IMediaGallery) =>
        this.gallery = Object.assign({}, gallery, {assignedItemType: this.itemType, assignedItem: this.id}));

  }

  selectGallery(gallery: IMediaGallery) {
    this.gallery = Object.assign({}, gallery);
  }

}
