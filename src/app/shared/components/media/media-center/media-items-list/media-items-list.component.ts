import { Component, Input, OnInit } from '@angular/core';
import { IMediaItem } from '../../../../interfaces/media/media-item.interface';

@Component({
  selector: 'media-items-list',
  templateUrl: './media-items-list.component.html',
  styleUrls: ['./media-items-list.component.scss']
})
export class MediaItemsListComponent implements OnInit {

  @Input() mediaItems: IMediaItem[];

  constructor() {
  }

  ngOnInit() {

  }

}
