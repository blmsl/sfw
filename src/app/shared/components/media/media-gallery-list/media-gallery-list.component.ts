import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IMediaGallery } from '../../../interfaces/media/media-gallery.interface';

@Component({
  selector: 'media-gallery-list',
  templateUrl: './media-gallery-list.component.html',
  styleUrls: ['media-gallery-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaGalleryListComponent implements OnInit {

  @Input() mediaGalleries: IMediaGallery[];

  ngOnInit() {
  }

  constructor() {
  }

}
