import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { MemberService } from '../../../../shared/services/member/member.service';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';
import { Observable } from 'rxjs/Rx';
import { IMediaItem } from '../../../../shared/interfaces/media/media-item.interface';

@Component({
  selector: 'member-detail-main',
  templateUrl: './member-detail-main.component.html',
  styleUrls: ['./member-detail-main.component.scss']
})
export class MemberDetailMainComponent implements OnInit {

  @Input() member: IMember;

  public memberImage: Observable<IMediaItem>;

  constructor(private mediaItemService: MediaItemService,
    public memberService: MemberService) {
  }

  ngOnInit() {
    if (this.member) {
      if (!this.memberImage) {
        this.memberImage = this.mediaItemService.getCurrentImage(['members', 'profile'], this.member.id);
      }
    }
  }

}
