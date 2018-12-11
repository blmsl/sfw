import { Component, OnInit } from '@angular/core';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import { ActivatedRoute } from '@angular/router';
import { IMediaGallery } from '../../../../shared/interfaces/media/media-gallery.interface';
import { IUploaderOptions } from '../../../../shared/interfaces/media/uploader-options.interface';
import { IMediaItem } from '../../../../shared/interfaces/media/media-item.interface';
import { Observable } from 'rxjs/index';
import { IUploaderConfig } from '../../../../shared/interfaces/media/uploader-config.interface';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';
import { MediaGalleryService } from '../../../../shared/services/media/media-gallery.service';
import { first } from 'rxjs/internal/operators';
import { IMediaGalleryFormOptions } from '../../../../shared/interfaces/media/media-gallery-form-options.interface';

@Component({
  selector: 'match-edit-media',
  templateUrl: './match-edit-media.component.html',
  styleUrls: ['./match-edit-media.component.scss']
})
export class MatchEditMediaComponent implements OnInit {

  public match: IMatch;

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
              private route: ActivatedRoute,
              private mediaGalleryService: MediaGalleryService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { match: IMatch }) => {
      this.match = data.match;
      this.uploaderOptions.itemId = this.match.id;
      // this.uploaderOptions.assignedObjects = ['match'];
      this.mediaItems$ = this.mediaItemService.getMediaItems([], this.match.id);
      this.mediaGalleries$ = this.mediaGalleryService.getAssignedGalleries(this.match.id);

      this.mediaGalleryService.setNewGallery().pipe(first()).subscribe((gallery: IMediaGallery) =>
        this.gallery = Object.assign({}, gallery, {assignedItemType: 'match', assignedItem: this.match.id}));
    });
  }

  selectGallery(gallery: IMediaGallery) {
    this.gallery = Object.assign({}, gallery);
  }

}
