import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                           from '@angular/core';
import { IMediaItem }       from '../../../interfaces/media/media-item.interface';
import { MatDialog }        from '@angular/material';
import {
  CdkDragDrop,
  moveItemInArray
}                           from '@angular/cdk/drag-drop';
import { IMediaGallery }    from '../../../interfaces/media/media-gallery.interface';
import { MediaItemService } from '../../../services/media/media-item.service';

@Component({
  selector: 'media-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'media-gallery.component.html',
  styleUrls: [ './media-gallery.component.scss' ]
})
export class MediaGalleryComponent implements OnInit {

  @Input() mediaItems: IMediaItem[];
  @Input() mediaGalleryList: IMediaGallery[];

  @Output() removeMediaItem: EventEmitter<IMediaItem> = new EventEmitter<IMediaItem>(false);

  public breakpoint: number;

  constructor(public dialog: MatDialog, private mediaItemService: MediaItemService) {
  }

  ngOnInit() {
    this.breakpoint = (window.screen.width <= 600) ? 1 : (window.screen.width <= 1024) ? 2 : (window.screen.width <= 1280) ? 4 : 5;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.mediaItems, event.previousIndex, event.currentIndex);
    [ this.mediaItems[ event.currentIndex ].ordering, this.mediaItems[ event.previousIndex ].ordering ] = [ this.mediaItems[ event.previousIndex ].ordering, this.mediaItems[ event.currentIndex ].ordering ];
    this.mediaItemService.updateMediaItems([ this.mediaItems[ event.currentIndex ], this.mediaItems[ event.previousIndex ] ]).subscribe((test) => console.log(test + ' ended'));
  }

}
