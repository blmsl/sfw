import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { IMemberOfTheWeek } from "../../../../shared/interfaces/member/member-of-the-week.interface";
import {
  Observable,
  Subscription
} from 'rxjs/index';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { MemberService } from '../../../../shared/services/member/member.service';
import OnDisconnect = firebase.database.OnDisconnect;
import { IMediaItem } from '../../../../shared/interfaces/media/media-item.interface';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';

@Component({
  selector: 'fame-member-entry',
  templateUrl: './fame-member-entry.component.html',
  styleUrls: ['./fame-member-entry.component.scss']
})
export class FameMemberEntryComponent implements OnInit, OnDestroy {

  @Input() entry: {
    key: string,
    value: {
      assignedMemberId: string;
      id: string;
      type: string;
      week: number;
      year: string;
    }
  };

  public member: IMember;
  public memberImage: Observable<IMediaItem>;

  private memberSubscription: Subscription;

  constructor(private mediaItemService: MediaItemService,
    private memberService: MemberService) {
  }

  ngOnInit() {
    if (this.entry.value.assignedMemberId) {
      this.memberSubscription = this.memberService.getMemberById(this.entry.value.assignedMemberId).subscribe((member: IMember) => {
        this.member = member;
        if (!this.memberImage) {
          const placeholder = member.mainData.gender === 'male'
            ? '/assets/sfw/placeholder/avatar_male.jpg'
            : '/assets/sfw/placeholder/avatar_female.jpg';
          this.memberImage = this.mediaItemService.getCurrentImage(['members', 'profile'], this.member.id, placeholder);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.entry.value.assignedMemberId) {
      this.memberSubscription.unsubscribe();
    }
  }

}
