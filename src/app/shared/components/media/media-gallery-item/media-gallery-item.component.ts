import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { MediaItemService } from '../../../services/media/media-item.service';
import { AlertService } from '../../../services/alert/alert.service';
import { MediaItemInfoComponent } from '../media-item-info/media-item-info.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'media-gallery-item',
  templateUrl: './media-gallery-item.component.html',
  styleUrls: ['./media-gallery-item.component.scss']
})
export class MediaGalleryItemComponent implements OnInit {

  @Input() mediaItem: IMediaItem;
  @Input() selected: boolean;

  constructor(private mediaItemService: MediaItemService,
              private alertService: AlertService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  showInfoDialog(mediaItem: IMediaItem): void {
    const dialogRef = this.dialog.open(MediaItemInfoComponent, {
      data: { mediaItem }
    });

    dialogRef.afterClosed().subscribe((updatedMediaItem: IMediaItem) => {
      if (updatedMediaItem) {
        this.mediaItemService.updateMediaItem(updatedMediaItem).then(() => {
            // this.mediaItemEdit.emit(updatedMediaItem);
            this.alertService.showSnackBar('success', 'general.media.upload.file.edit.saved');
          },
          (error: any) => this.alertService.showSnackBar('error', error.message)
        ).catch((error: any) => {
          this.alertService.showSnackBar('error', error.message);
        });
      }
    });
  }

  removeMediaItem(mediaItem: IMediaItem) {
    this.mediaItemService.removeMediaItem(mediaItem.id).then(() => console.log('deleted'));
  }

}
