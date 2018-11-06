import { Component, OnInit } from '@angular/core';
import { IMediaGallery } from '../../../shared/interfaces/media/media-gallery.interface';
import { Observable } from 'rxjs/index';
import { MediaGalleryService } from '../../../shared/services/media/media-gallery.service';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {

  public mediaGalleries$: Observable<IMediaGallery[]>;

  constructor(private mediaGalleryService: MediaGalleryService) {
    this.mediaGalleries$ = mediaGalleryService.mediaGalleries$;
  }

  ngOnInit() {
  }

}
