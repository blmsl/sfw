import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { MatDialog } from '@angular/material';
import { MediaItemInfoComponent } from '../media-item-info/media-item-info.component';

@Component({
  selector: 'media-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent implements OnInit {

  @Input() mediaItems: IMediaItem[];
  @Output() removeMediaItem: EventEmitter<IMediaItem> = new EventEmitter<IMediaItem>(false);

  public breakpoint: number;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.breakpoint = (window.screen.width <= 600) ? 1 : (window.screen.width <= 1024) ? 2 : (window.screen.width <= 1280) ? 4 : 5;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : (event.target.innerWidth <= 1024) ? 2 : (event.target.innerWidth <= 1280) ? 4 : 5;
  }

  openDialog(mediaItem: IMediaItem) {
    this.dialog.open(MediaItemInfoComponent, {
      data: { mediaItem: mediaItem }
    });
  }

  saveMediaItemTitle(title: string){
    console.log(title);
  }
}
