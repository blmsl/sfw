import { Component, Input, OnInit } from '@angular/core';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { ILocation } from '../../../../shared/interfaces/location/location.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';
import { Observable } from 'rxjs/index';
import { IMediaItem } from '../../../../shared/interfaces/media/media-item.interface';

@Component({
  selector: 'club-detail-main',
  templateUrl: './club-detail-main.component.html',
  styleUrls: ['./club-detail-main.component.scss']
})
export class ClubDetailMainComponent implements OnInit {

  @Input() club: IClub;
  @Input() locations: ILocation[];
  @Input() members: IMember[];

  public clubLogo: Observable<IMediaItem>;

  constructor(private mediaItemService: MediaItemService) { }

  ngOnInit() {
    if (!this.clubLogo) {
      this.clubLogo = this.mediaItemService.getCurrentImage(['clubs', 'profile'], this.club.id);
    }
  }

}
