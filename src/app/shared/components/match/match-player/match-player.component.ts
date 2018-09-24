import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { IMember } from '../../../interfaces/member/member.interface';
import {
  Observable,
  of
} from 'rxjs/index';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { MediaItemService } from '../../../services/media/media-item.service';
import { SkyhookDndService } from 'angular-skyhook';

@Component({
  selector: 'match-player',
  templateUrl: './match-player.component.html',
  styleUrls: ['./match-player.component.scss']
})
export class MatchPlayerComponent implements OnInit, OnDestroy {

  @Input() members: IMember[];
  @Input() member: IMember;
  @Input() assignedPosition: any;

  public memberImage: Observable<IMediaItem>;

  /*public playerSource = this.dnd.dragSource<IDraggedItemInterface>('PLAYERS', {
    canDrag: () => {
      return true;
    },
    beginDrag: () => ({ id: this.member.id }),
    endDrag: () => ({ id: this.member.id }),
  });

  public isDragging$ = this.playerSource.listen(m => {
    return m.isDragging();
  });*/

  constructor(private mediaItemService: MediaItemService,
    /*private dnd: SkyhookDndService*/) {
  }

  ngOnInit() {
    if (this.member) {
      if (!this.memberImage) {
        this.memberImage = this.mediaItemService.getCurrentImage(['members', 'profile'], this.member.id, '/assets/sfw/placeholder/avatar_male.jpg');
      }
    } else {
      this.memberImage = of({
        downloadURL: '/assets/sfw/placeholder/avatar_male.jpg'
      });
    }
  }

  ngOnDestroy() {
    //this.playerSource.unsubscribe();
  }

}
