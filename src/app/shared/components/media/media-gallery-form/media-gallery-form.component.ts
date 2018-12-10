import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { MediaGalleryService } from '../../../services/media/media-gallery.service';
import { AuthService } from '../../../services/auth/auth.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { IMediaGallery } from '../../../interfaces/media/media-gallery.interface';
import { SeasonService } from '../../../services/season/season.service';
import { Observable, Subscription } from 'rxjs/index';
import { ISeason } from '../../../interfaces/season.interface';
import { AlertService } from '../../../services/alert/alert.service';
import { MediaItemsListModalComponent } from './media-items-list-modal/media-items-list-modal.component';
import { MediaItemService } from '../../../services/media/media-item.service';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { Router } from '@angular/router';
import { first } from 'rxjs/internal/operators';

@Component({
  selector: 'media-gallery-form',
  templateUrl: './media-gallery-form.component.html',
  styleUrls: ['./media-gallery-form.component.scss']
})
export class MediaGalleryFormComponent implements OnDestroy, OnChanges {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() gallery: IMediaGallery;
  @Input() mediaGalleryFormOptions;

  public form: FormGroup;
  public seasons$: Observable<ISeason[]>;

  public mediaItems: IMediaItem[];
  private galleryStatus = 'new';
  private mediaItemsSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private alertService: AlertService,
              private seasonService: SeasonService,
              private router: Router,
              public mediaGalleryService: MediaGalleryService,
              public mediaItemService: MediaItemService,
              public dialog: MatDialog) {
    this.seasons$ = seasonService.seasons$;
    this.mediaItems = [];
  }


  ngOnChanges() {

    if (this.gallery.id) {
      this.galleryStatus = 'edit';
    }

    this.mediaItemsSubscription = this.mediaItemService.getMediaItemsById(this.gallery.assignedMediaItems)
      .pipe(first())
      .subscribe(mediaItems => this.mediaItems = mediaItems);

    this.form = this.fb.group({
      title: [this.gallery.title, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      description: this.gallery.description,
      publication: this.fb.group({
        dateTime: new Date(),
        from: this.authService.userId,
        status: 0
      }),
      assignedItemType: [{
        value: this.gallery.assignedItemType,
        disabled: this.mediaGalleryFormOptions && this.mediaGalleryFormOptions.disabledAssignedItem
      }, [Validators.required]],
      assignedItem: [{ value: this.gallery.assignedItem, disabled: this.mediaGalleryFormOptions && this.mediaGalleryFormOptions.disabledAssignedItem }, [Validators.required]]
    });

    this.form.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((changes: IMediaGallery) => {
      if (this.form.valid) {
        this.gallery = Object.assign({}, this.gallery, changes);
      }
    });
  }

  openDialog(): void {
    const initialData = [...this.mediaItems];
    const dialogRef = this.dialog.open(MediaItemsListModalComponent, {
      data: initialData
    });

    dialogRef.afterClosed().subscribe((mediaItems: IMediaItem[]) => {
      if (mediaItems) {
        this.mediaItems = mediaItems;
      }
    });
  }

  redirectToList() {
    this.router.navigate(['/uploader/list']).then();
  }

  drop(event) {
    if (!this.mediaItems.find(item => item.id === event.item.data.id)) {
      this.mediaItems = [...this.mediaItems, event.item.data];
    }
  }

  removeItem(mediaItemId: string) {
    this.mediaItems = this.mediaItems.filter((item: IMediaItem) => item.id !== mediaItemId);
  }

  saveMediaGallery(): void {
    const newGallery: any = Object.assign({}, this.gallery, {assignedMediaItems: this.mediaItems.map(item => item.id)});
    let action: Promise<any>;
    if (this.galleryStatus === 'new') {
      action = this.mediaGalleryService.createMediaGallery(newGallery);
    } else {
      action = this.mediaGalleryService.updateMediaGallery(newGallery);
    }

    action.then(() => {
        this.alertService.showSnackBar('success', 'general.media.gallery.saved');
        if (this.mediaGalleryFormOptions && this.mediaGalleryFormOptions.redirect) {
          this.redirectToList();
        }
      },
      (error: any) => this.alertService.showSnackBar('error', error.message)
    ).catch((error: any) => {
      this.alertService.showSnackBar('error', error.message);
    });
  }

  ngOnDestroy(): void {
    this.mediaItemsSubscription.unsubscribe();
  }

}
