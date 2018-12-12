import { Component, OnInit } from '@angular/core';
import { IMediaGallery } from '../../../shared/interfaces/media/media-gallery.interface';
import { ActivatedRoute } from '@angular/router';
import { IMediaGalleryFormOptions } from '../../../shared/interfaces/media/media-gallery-form-options.interface';

@Component({
  selector: 'gallery-edit',
  templateUrl: './gallery-edit.component.html',
  styleUrls: ['./gallery-edit.component.scss']
})
export class GalleryEditComponent implements OnInit {

  public gallery: IMediaGallery;
  public mediaGalleryFormOptions: IMediaGalleryFormOptions = {
    disabledAssignedItem: false,
    draggableList: false,
    redirect: true
  };

  constructor(private route: ActivatedRoute) {

  }
    ngOnInit() {
      this.route.data.subscribe((data: { gallery: IMediaGallery }) => {
        this.gallery = data.gallery;
      });
    }


}
