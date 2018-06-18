import { Component, OnInit } from '@angular/core';
import { MediaItemService } from '../../../shared/services/media/media-item.service';

@Component({
  selector: 'team-media',
  templateUrl: './team-media.component.html'
})
export class TeamMediaComponent implements OnInit {

  constructor(private mediaItemService: MediaItemService) { }

  ngOnInit() {
    // this.mediaItemService.getMediaItemsList('', '');
  }

}
