import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { ISeason } from '../../../../shared/interfaces/season.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { IMediaItem } from '../../../../shared/interfaces/media/media-item.interface';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'team-detail-main',
  templateUrl: './team-detail-main.component.html',
  styleUrls: ['./team-detail-main.component.scss']
})
export class TeamDetailMainComponent implements OnInit {

  @Input() team: ITeam;
  @Input() seasons: ISeason[];
  @Input() clubs: IClub[];
  @Input() categories: ICategory[];

  public teamLogo: Observable<IMediaItem>;
  public teamImage: Observable<IMediaItem>;

  constructor(private mediaItemService: MediaItemService) {
  }

  ngOnInit() {
    if (this.team) {
      this.teamLogo = this.mediaItemService.getCurrentImage(['teams','logo'], this.team.id);
      this.teamImage = this.mediaItemService.getCurrentImage(['teams','profile'], this.team.id);
    }
  }

}
