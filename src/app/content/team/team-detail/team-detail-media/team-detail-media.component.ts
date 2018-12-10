import { Component, OnInit } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { Observable } from 'rxjs/index';
import { MediaGalleryService } from '../../../../shared/services/media/media-gallery.service';
import { IUploaderConfig } from '../../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../shared/interfaces/media/uploader-options.interface';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';
import { IMediaItem } from '../../../../shared/interfaces/media/media-item.interface';
import { IMediaGallery } from '../../../../shared/interfaces/media/media-gallery.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'team-detail-media',
  templateUrl: './team-detail-media.component.html',
  styleUrls: ['./team-detail-media.component.scss']
})
export class TeamDetailMediaComponent implements OnInit {

  public team: ITeam;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: true
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: [],
    itemId: '',
    queueLimit: 5
  };

  public mediaItems$: Observable<IMediaItem[]>;
  public mediaGalleries$: Observable<IMediaGallery[]>;

  constructor(private mediaItemService: MediaItemService,
              private route: ActivatedRoute,
              private mediaGalleryService: MediaGalleryService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { team: ITeam }) => {
      this.team = data.team;
      this.uploaderOptions.itemId = this.team.id;
      this.mediaItems$ = this.mediaItemService.getMediaItems([], this.team.id);
      this.mediaGalleries$ = this.mediaGalleryService.getAssignedGalleries(this.team.id);
    });
  }

}
