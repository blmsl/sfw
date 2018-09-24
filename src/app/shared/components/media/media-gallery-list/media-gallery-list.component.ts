import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IMediaGallery } from '../../../interfaces/media/media-gallery.interface';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MediaGalleryService } from '../../../services/media/media-gallery.service';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'media-gallery-list',
  templateUrl: './media-gallery-list.component.html',
  styleUrls: ['media-gallery-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaGalleryListComponent implements OnInit {

  @Input() mediaGalleries: IMediaGallery[];

  public form: FormGroup;
  public step: number;

  constructor(private fb: FormBuilder,
    private mediaGalleryService: MediaGalleryService,
    private alertService: AlertService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      search: ''
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  removeMediaGallery(mediaGallery: IMediaGallery) {
    this.mediaGalleryService.removeMediaGallery(mediaGallery)
      .then(() => this.alertService.showSnackBar('success', 'general.media.gallery.deleted'),
        (error: any) => this.alertService.showSnackBar('error', error.message));
  }

  editMediaGallery(mediaGallery: IMediaGallery) {
    console.log(mediaGallery);
    alert('ToDo');
  }

}
