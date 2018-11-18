import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';
import { Observable } from 'rxjs/index';
import { IMediaItem } from '../../../../shared/interfaces/media/media-item.interface';
import { IUploaderOptions } from '../../../../shared/interfaces/media/uploader-options.interface';
import { IUploaderConfig } from '../../../../shared/interfaces/media/uploader-config.interface';
import { IMediaGallery } from '../../../../shared/interfaces/media/media-gallery.interface';
import { ActivatedRoute } from '@angular/router';
import { MediaGalleryService } from '../../../../shared/services/media/media-gallery.service';

@Component({
  selector: 'club-edit-media',
  templateUrl: './club-edit-media.component.html',
  styleUrls: ['./club-edit-media.component.scss']
})
export class ClubEditMediaComponent implements OnInit {

  @Input() club: IClub;

  public mediaItems$: Observable<IMediaItem[]>;
  public mediaGalleries$: Observable<IMediaGallery[]>;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: true,
    headerTitle: 'general.clubs.edit.uploader.title'
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['clubs'],
    itemId: '',
    queueLimit: 99
  };

  constructor(private route: ActivatedRoute,
    private mediaGalleryService: MediaGalleryService,
    private mediaItemService: MediaItemService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => {
      this.club = data.club;
      this.mediaItems$ = this.mediaItemService.getMediaItems([], this.club.id);
      this.mediaGalleries$ = this.mediaGalleryService.getAssignedGalleries(this.club.id);
    });
  }

}
