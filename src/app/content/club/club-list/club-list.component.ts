import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { Observable } from 'rxjs/index';
import { IMediaItem } from '../../../shared/interfaces/media/media-item.interface';
import { MediaItemService } from '../../../shared/services/media/media-item.service';

@Component({
  selector: 'club-list',
  templateUrl: 'club-list.component.html',
  styleUrls: ['club-list.component.scss']
})

export class ClubListComponent {

  @Input() clubs$: IClub[];

  @Output() remove: EventEmitter<IClub> = new EventEmitter(false);
  @Output() update: EventEmitter<IClub> = new EventEmitter(false);

  public clubLogo: Observable<IMediaItem>;

  constructor(private mediaItemService: MediaItemService) {
  }

  getClubLogo(club: IClub): Observable<IMediaItem> {
    if (!this.clubLogo) {
      this.clubLogo = this.mediaItemService.getCurrentImage(['clubs', 'profile'], club.id);
    }
    return this.clubLogo;
  }

}
