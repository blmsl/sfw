import { Component, OnInit } from '@angular/core';
import { MediaItemService } from '../../../shared/services/media/media-item.service';
import { IMediaItem } from '../../../shared/interfaces/media/media-item.interface';
import { Observable } from 'rxjs/index';
import { MediaGalleryService } from '../../../shared/services/media/media-gallery.service';
import { IUploaderConfig } from '../../../shared/interfaces/media/uploader-config.interface';
import { IMediaGallery } from '../../../shared/interfaces/media/media-gallery.interface';
import { IUploaderOptions } from '../../../shared/interfaces/media/uploader-options.interface';
import { ActivatedRoute } from '@angular/router';
import { ILocation } from '../../../shared/interfaces/location/location.interface';

@Component({
  selector: 'location-media',
  templateUrl: './location-media.component.html',
  styleUrls: ['./location-media.component.scss']
})
export class LocationMediaComponent implements OnInit {

  public location: ILocation;
  public mediaItems$: Observable<IMediaItem[]>;
  public mediaGalleries$: Observable<IMediaGallery[]>;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: true,
    headerTitle: 'general.locations.edit.uploader.title'
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['locations'],
    itemId: '',
    queueLimit: 99
  };

  constructor(private route: ActivatedRoute,
              private mediaGalleryService: MediaGalleryService,
              private mediaItemService: MediaItemService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { location: ILocation }) => {
      this.location = data.location;
      this.uploaderOptions.itemId = this.location.id;
      this.mediaItems$ = this.mediaItemService.getMediaItems([], this.location.id);
      this.mediaGalleries$ = this.mediaGalleryService.getAssignedGalleries(this.location.id);
    });
  }

}
