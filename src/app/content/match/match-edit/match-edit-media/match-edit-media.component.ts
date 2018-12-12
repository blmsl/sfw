import { Component, OnInit } from '@angular/core';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import { ActivatedRoute } from '@angular/router';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';
import { MediaGalleryService } from '../../../../shared/services/media/media-gallery.service';

@Component({
  selector: 'match-edit-media',
  templateUrl: './match-edit-media.component.html',
  styleUrls: ['./match-edit-media.component.scss']
})
export class MatchEditMediaComponent implements OnInit {

  public id: string;
  public itemType = 'match';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { match: IMatch }) => {
      this.id = data.match.id;
    });

  }
}
