import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { MediaGalleryService } from '../../../services/media/media-gallery.service';
import { AuthService } from '../../../services/auth/auth.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { IMediaGallery } from '../../../interfaces/media/media-gallery.interface';
import { SeasonService } from '../../../services/season/season.service';
import { Observable } from 'rxjs/index';
import { ISeason } from '../../../interfaces/season.interface';
import { AlertService } from '../../../services/alert/alert.service';
import { MediaItemsListModalComponent } from './media-items-list-modal/media-items-list-modal.component';
import { MediaItemService } from '../../../services/media/media-item.service';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';

@Component({
  selector: 'media-gallery-form',
  templateUrl: './media-gallery-form.component.html',
  styleUrls: ['./media-gallery-form.component.scss']
})
export class MediaGalleryFormComponent implements OnInit {

  @Input() uploaderOptions: IUploaderOptions;

  public form: FormGroup;
  public gallery: IMediaGallery;
  public seasons$: Observable<ISeason[]>;

  public mediaItemsNames: string[];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private alertService: AlertService,
              private seasonService: SeasonService,
              public mediaGalleryService: MediaGalleryService,
              public mediaItemService: MediaItemService,
              public dialog: MatDialog) {
    this.seasons$ = seasonService.seasons$;
    this.gallery = { ...this.gallery, assignedMediaItems: [] };
    this.mediaItemsNames = [];
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

  openDialog(): void {

    const dialogRef = this.dialog.open(MediaItemsListModalComponent, {
      data: [...this.gallery.assignedMediaItems]
    });

    const assignedMediaItemSubscribtion = dialogRef.componentInstance.assignedMediaItem
      .subscribe((mediaItems: IMediaItem[]) => {
        this.gallery = Object.assign({}, this.gallery, { assignedMediaItems: mediaItems.map(item => item.id) });
        this.mediaItemsNames = mediaItems.map(item => item.file.name);
    });

    dialogRef.afterClosed().subscribe((selectionConfirmed) => {
      assignedMediaItemSubscribtion.unsubscribe();
      if (!selectionConfirmed) {
        this.gallery = { ...this.gallery, assignedMediaItems: [] };
      }
    });
  }

  saveMediaGallery() {
    const newGallery = Object.assign({}, this.gallery);
    this.mediaGalleryService.createMediaGallery(newGallery)
      .then(() => this.alertService.showSnackBar('success', 'general.media.gallery.saved'),
        (error: any) => this.alertService.showSnackBar('error', error.message)
      ).catch((error: any) => {
      this.alertService.showSnackBar('error', error.message);
    });
  }

}
