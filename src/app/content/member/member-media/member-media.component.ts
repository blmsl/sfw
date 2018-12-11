import { Component, Input, OnInit } from '@angular/core';
import { MediaItemService } from '../../../shared/services/media/media-item.service';
import { IMediaItem } from '../../../shared/interfaces/media/media-item.interface';
import { Observable } from 'rxjs/index';
import { MediaGalleryService } from '../../../shared/services/media/media-gallery.service';
import { IUploaderConfig } from '../../../shared/interfaces/media/uploader-config.interface';
import { IMediaGallery } from '../../../shared/interfaces/media/media-gallery.interface';
import { IUploaderOptions } from '../../../shared/interfaces/media/uploader-options.interface';
import { ActivatedRoute } from '@angular/router';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { IMember } from '../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'member-media',
  templateUrl: './member-media.component.html',
  styleUrls: ['./member-media.component.scss']
})
export class MemberMediaComponent implements OnInit {

  public member: IMember;
  public mediaItems$: Observable<IMediaItem[]>;
  public mediaGalleries$: Observable<IMediaGallery[]>;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: true,
    headerTitle: 'general.members.edit.uploader.title'
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['members'],
    itemId: '',
    queueLimit: 99
  };

  constructor(private route: ActivatedRoute,
              private mediaGalleryService: MediaGalleryService,
              private mediaItemService: MediaItemService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { member: IMember }) => {
      this.member = data.member;
      this.uploaderOptions.itemId = this.member.id;
      this.mediaItems$ = this.mediaItemService.getMediaItems([], this.member.id);
      this.mediaGalleries$ = this.mediaGalleryService.getAssignedGalleries(this.member.id);
    });
  }

}
