import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MediaGalleryService } from '../../../services/media/media-gallery.service';
import { Observable } from 'rxjs/Rx';
import { IMediaGallery } from '../../../interfaces/media/media-gallery.interface';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MediaGalleryFormComponent } from '../media-gallery-form/media-gallery-form.component';

@Component({
  selector: 'media-galleries',
  templateUrl: './media-galleries.component.html',
  styleUrls: ['./media-galleries.component.scss']
})
export class MediaGalleriesComponent implements OnInit {

  @Output() closeGallerySidebar: EventEmitter<void> = new EventEmitter<void>(false);

  public mediaGalleries$: Observable<IMediaGallery[]>;
  public form: FormGroup;

  constructor(public dialog: MatDialog,
    private mediaGalleryService: MediaGalleryService) {
    this.mediaGalleries$ = mediaGalleryService.mediaGalleries$;
  }

  ngOnInit() {
    /* this.form = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(3)]]
    }); */
  }

  openGalleryForm() {
    this.dialog.open(MediaGalleryFormComponent, {
      // data: { uploaderOptions: this.uploaderOptions }
    });
  }
}
