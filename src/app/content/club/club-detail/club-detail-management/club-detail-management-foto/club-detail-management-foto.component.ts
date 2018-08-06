import { Component, Input, OnInit } from '@angular/core';
import { IClub } from '../../../../../shared/interfaces/club/club.interface';
import { MediaItemService } from '../../../../../shared/services/media/media-item.service';
import { Observable } from 'rxjs/index';
import { IMediaItem } from '../../../../../shared/interfaces/media/media-item.interface';

@Component({
  selector: 'club-detail-management-foto',
  templateUrl: './club-detail-management-foto.component.html',
  styleUrls: ['./club-detail-management-foto.component.scss']
})
export class ClubDetailManagementFotoComponent implements OnInit {

  @Input() club: IClub;
  public clubManagementImage: Observable<IMediaItem>;

  constructor(private mediaItemService: MediaItemService) { }

  ngOnInit() {
    if (!this.clubManagementImage) {
      this.clubManagementImage = this.mediaItemService.getCurrentImage(['clubs', 'management'], this.club.id);
    }
  }

}
