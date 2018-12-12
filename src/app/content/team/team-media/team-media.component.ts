import { Component, OnInit } from '@angular/core';
import { MediaItemService } from '../../../shared/services/media/media-item.service';
import { ActivatedRoute } from '@angular/router';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { ITeam } from '../../../shared/interfaces/team/team.interface';

@Component({
  selector: 'team-media',
  templateUrl: './team-media.component.html'
})
export class TeamMediaComponent implements OnInit {

  public id: string;
  public itemType = 'team';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { team: ITeam }) => {
      this.id = data.team.id;
    });
  }

}
