import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { IMediaGallery } from '../../../../shared/interfaces/media/media-gallery.interface';
import { IUploaderOptions } from '../../../../shared/interfaces/media/uploader-options.interface';
import { IMediaItem } from '../../../../shared/interfaces/media/media-item.interface';
import { Observable } from 'rxjs/index';
import { IUploaderConfig } from '../../../../shared/interfaces/media/uploader-config.interface';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';
import { MediaGalleryService } from '../../../../shared/services/media/media-gallery.service';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'team-edit-media',
  templateUrl: './team-edit-media.component.html',
  styleUrls: ['./team-edit-media.component.scss']
})
export class TeamEditMediaComponent implements OnInit {

  public team: ITeam;

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

  public mediaItems$: Observable<IMediaItem[]>;
  public mediaGalleries$: Observable<IMediaGallery[]>;

  constructor(private mediaItemService: MediaItemService,
    private route: ActivatedRoute,
    private mediaGalleryService: MediaGalleryService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { team: ITeam }) => {
      this.team = data.team;
      this.uploaderOptions.itemId = this.team.id;
      this.mediaItems$ = this.mediaItemService.getMediaItems([], this.team.id);
      this.mediaGalleries$ = this.mediaGalleryService.getAssignedGalleries(this.team.id);
    });
  }

}
