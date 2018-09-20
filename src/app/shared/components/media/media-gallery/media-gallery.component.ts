import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                                 from '@angular/core';
import { IMediaItem }             from '../../../interfaces/media/media-item.interface';
import { MatDialog }              from '@angular/material';
import { MediaItemInfoComponent } from '../media-item-info/media-item-info.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDrop,
  moveItemInArray,
  transferArrayItem
}                                 from '@angular/cdk/drag-drop';
import { IMediaGallery }          from '../../../interfaces/media/media-gallery.interface';

@Component({
  selector: 'media-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent implements OnInit {

  @Input() mediaItems: IMediaItem[];
  @Input() mediaGalleryList: IMediaGallery[];

  @Output() removeMediaItem: EventEmitter<IMediaItem> = new EventEmitter<IMediaItem>(false);

  public breakpoint: number;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.breakpoint = (window.screen.width <= 600) ? 1 : (window.screen.width <= 1024) ? 2 : (window.screen.width <= 1280) ? 4 : 5;
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.mediaItems, event.previousIndex, event.currentIndex);
  }

  isAllowed = (drag?: CdkDrag, drop?: CdkDrop) => {
    return false;
  };

  saveMediaItemTitle(title: string){
    console.log(title);
  }

  addToList(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
