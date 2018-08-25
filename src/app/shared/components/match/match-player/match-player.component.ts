import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../interfaces/member/member.interface';
import { Observable } from 'rxjs/index';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { MediaItemService } from '../../../services/media/media-item.service';

@Component({
  selector: 'match-player',
  templateUrl: './match-player.component.html',
  styleUrls: ['./match-player.component.scss']
})
export class MatchPlayerComponent implements OnInit {

  @Input() members: IMember[];
  @Input() member: IMember;
  @Input() assignedPosition: any;

  public memberImage: Observable<IMediaItem>;

  constructor(private mediaItemService: MediaItemService) {
  }

  ngOnInit() {
    if (this.member) {
      if (!this.memberImage) {
        this.memberImage = this.mediaItemService.getCurrentImage(['members', 'profile'], this.member.id, '/assets/sfw/placeholder/avatar_male.jpg');
      }
    }
  }

}
