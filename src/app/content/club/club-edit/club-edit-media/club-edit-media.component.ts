import {
  Component,
  Input,
  OnInit
}                           from '@angular/core';
import { IClub }            from '../../../../shared/interfaces/club/club.interface';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';
import { Observable }       from 'rxjs/index';
import { IMediaItem }       from '../../../../shared/interfaces/media/media-item.interface';

@Component({
  selector: 'club-edit-media',
  templateUrl: './club-edit-media.component.html',
  styleUrls: ['./club-edit-media.component.scss']
})
export class ClubEditMediaComponent implements OnInit {

  @Input() club: IClub;

  public mediaItems$: Observable<IMediaItem[]>;

  constructor(private mediaItemService: MediaItemService) {
  }

  ngOnInit() {
    if(this.club.id && !this.mediaItems$){
      this.mediaItems$ = this.mediaItemService.getMediaItems(null, this.club.id);
    }
  }

}
