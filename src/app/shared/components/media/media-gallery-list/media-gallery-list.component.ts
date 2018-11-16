import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IMediaGallery } from '../../../interfaces/media/media-gallery.interface';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, first, map } from 'rxjs/operators';
import { MediaGalleryService } from '../../../services/media/media-gallery.service';
import { AlertService } from '../../../services/alert/alert.service';
import { MediaItemService } from '../../../services/media/media-item.service';
import { Observable } from 'rxjs';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'media-gallery-list',
  templateUrl: './media-gallery-list.component.html',
  styleUrls: ['media-gallery-list.component.scss'],
})
export class MediaGalleryListComponent implements OnInit, OnDestroy {

  @Input() mediaGalleries: IMediaGallery[];

  private mediaItemsSubscription: Subscription;
  public form: FormGroup;
  public step: number;
  public showCoverBtn = true;
  public mediaItems: Array<IMediaItem[]>;

  constructor(private fb: FormBuilder,
    private mediaGalleryService: MediaGalleryService,
    public mediaItemService: MediaItemService,
    private alertService: AlertService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.mediaItemsSubscription = this.mediaItemService.mediaItems$
      .subscribe(mediaItems => {
        this.mediaItems = this.mediaGalleries
          .map((gallery: IMediaGallery) => mediaItems
            .filter(item => gallery.assignedMediaItems.includes(item.id)));
      });

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

  ngOnDestroy() {
    this.mediaItemsSubscription.unsubscribe();
  }
}
