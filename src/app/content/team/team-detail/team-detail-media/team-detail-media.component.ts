import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';
import { Observable } from 'rxjs/Rx';
import { IMediaItem } from '../../../../shared/interfaces/media/media-item.interface';

@Component({
  selector: 'team-detail-media',
  templateUrl: './team-detail-media.component.html',
  styleUrls: ['./team-detail-media.component.scss']
})
export class TeamDetailMediaComponent implements OnInit {

  @Input() team: ITeam;

  public media$: Observable<IMediaItem | IMediaItem[]>;

  constructor(private mediaItemService: MediaItemService) { }

  ngOnInit() {
    if (this.team) {
      this.mediaItemService.getAssignedMedia(['teams'], this.team.id)
        .subscribe((mediaItems: IMediaItem[]) => console.log(mediaItems));
    }
  }

}
