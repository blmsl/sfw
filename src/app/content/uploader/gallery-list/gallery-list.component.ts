import { Component, OnInit } from '@angular/core';
import { IMediaGallery } from '../../../shared/interfaces/media/media-gallery.interface';
import { Observable } from 'rxjs/index';
import { MediaGalleryService } from '../../../shared/services/media/media-gallery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {

  public mediaGalleries$: Observable<IMediaGallery[]>;

  constructor(private mediaGalleryService: MediaGalleryService,
              private router: Router) {
    this.mediaGalleries$ = mediaGalleryService.mediaGalleries$;
  }

  ngOnInit() {
  }

  redirectToEdit(gallery: IMediaGallery): void {
    this.router.navigate(['/uploader/edit', gallery.id]);
  }

}
