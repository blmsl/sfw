import {
  Component,
  Input,
  OnInit
}                           from '@angular/core';
import { IMediaItem }       from '../../../interfaces/media/media-item.interface';
import { MediaItemService } from '../../../services/media/media-item.service';
import { AlertService }     from '../../../services/alert/alert.service';

@Component({
  selector: 'media-gallery-item',
  templateUrl: './media-gallery-item.component.html',
  styleUrls: ['./media-gallery-item.component.scss']
})
export class MediaGalleryItemComponent implements OnInit {

  @Input() mediaItem: IMediaItem;

  constructor(private mediaItemService: MediaItemService,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  removeMediaItem(mediaItem: IMediaItem): void {
    this.mediaItemService.removeMediaItem(mediaItem.id)
      .then(() => this.alertService.showSnackBar('success', 'general.media.uploader.removedFile'))
      .catch(error => this.alertService.showSnackBar('error', error.message));
  }

  showInfoDialog(mediaItem: IMediaItem): void {
    console.log(mediaItem.id);
    alert('ToDo');
  }

}
