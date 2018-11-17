import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IMediaGallery } from '../../shared/interfaces/media/media-gallery.interface';
import { MediaGalleryService } from '../../shared/services/media/media-gallery.service';
import { map, take } from 'rxjs/internal/operators';

@Injectable()
export class UploaderResolver implements Resolve<IMediaGallery> {

  constructor(private mediaGalleryService: MediaGalleryService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IMediaGallery> {

    if (Object.keys(route.params).length === 0) {
      return this.mediaGalleryService.setNewGallery();
    }

    return this.mediaGalleryService.getMediaGalleryById(route.params['galleryId']).pipe(
      take(1),
      map((gallery: IMediaGallery) => {
        if (gallery && gallery.id) {
          return gallery;
        } else {
          this.router.navigate(['/uploader/list']).then();
        }
      })
    );
  }
}

