import {
  Component,
  Input
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { MediaGalleryService } from '../../../services/media/media-gallery.service';
import { AuthService } from '../../../services/auth/auth.service';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { IMediaGallery } from '../../../interfaces/media/media-gallery.interface';
import { SeasonService } from '../../../services/season/season.service';
import { Observable } from 'rxjs/index';
import { ISeason } from '../../../interfaces/season.interface';
import { AlertService } from '../../../services/alert/alert.service';

@Component({
  selector: 'media-gallery-form',
  templateUrl: './media-gallery-form.component.html'
})
export class MediaGalleryFormComponent {

  @Input() uploaderOptions: IUploaderOptions;

  public form: FormGroup;
  public gallery: IMediaGallery;
  public seasons$: Observable<ISeason[]>;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private seasonService: SeasonService,
    public mediaGalleryService: MediaGalleryService) {
    this.seasons$ = seasonService.seasons$;
  }


  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: '',
      publication: this.fb.group({
        dateTime: new Date(),
        from: this.authService.userId,
        status: 0
      }),
      assignedItemType: ['', [Validators.required]],
      assignedItem: ['', [Validators.required]]
    });

    this.form.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((changes: IMediaGallery) => {
      if (this.form.valid) {
        this.gallery = Object.assign({}, this.gallery, changes);
      }
    });
  }

  saveMediaGallery() {
    this.mediaGalleryService.createMediaGallery(this.gallery)
      .then(() => this.alertService.showSnackBar('success', 'general.media.gallery.saved'),
        (error: any) => this.alertService.showSnackBar('error', error.message)
      ).catch((error: any) => {
        this.alertService.showSnackBar('error', error.message);
      });
  }

}
