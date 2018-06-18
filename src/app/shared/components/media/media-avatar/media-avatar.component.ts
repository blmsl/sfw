import { Component, Input, OnInit } from '@angular/core';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { Observable } from 'rxjs/Rx';
import { MediaItemService } from '../../../services/media/media-item.service';

@Component({
  selector: 'media-avatar',
  templateUrl: './media-avatar.component.html',
  styleUrls: ['./media-avatar.component.scss']
})
export class MediaAvatarComponent implements OnInit {

  @Input() assignedObjects: string[];
  @Input() itemId: string;

  public mediaItem$: Observable<IMediaItem>;

  constructor(private mediaItemService: MediaItemService) {
  }

  ngOnInit() {
    if (!this.mediaItem$) {
      this.mediaItem$ = this.mediaItemService.getCurrentImage(this.assignedObjects, this.itemId);
    }
  }

}
