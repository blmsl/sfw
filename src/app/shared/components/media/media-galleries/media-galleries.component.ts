import {
  Component,
  OnInit
} from '@angular/core';
import { MediaGalleryService } from '../../../services/media/media-gallery.service';
import { Observable } from 'rxjs/index';
import { IMediaGallery } from '../../../interfaces/media/media-gallery.interface';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'media-galleries',
  templateUrl: './media-galleries.component.html',
  styleUrls: ['./media-galleries.component.scss']
})
export class MediaGalleriesComponent implements OnInit {

  public mediaGalleries$: Observable<IMediaGallery[]>;
  public form: FormGroup;

  constructor(private mediaGalleryService: MediaGalleryService,
    private fb: FormBuilder) {
    this.mediaGalleries$ = mediaGalleryService.mediaGalleries$;
  }

  ngOnInit() {
    this.form = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

}
