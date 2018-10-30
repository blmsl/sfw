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

  public assignedMediaItems: string[];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private alertService: AlertService,
              private seasonService: SeasonService,
              public mediaGalleryService: MediaGalleryService,
              public dialog: MatDialog) {
    this.seasons$ = seasonService.seasons$;
    this.assignedMediaItems = [];
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
      data: this.assignedMediaItems
    });

    const assignedMediaItemSubscribtion = dialogRef.componentInstance.assignedMediaItem.subscribe((mediaItem) => {
      if (this.assignedMediaItems.indexOf(mediaItem.id) == -1) {
        this.assignedMediaItems.push(mediaItem.id);
      } else {
        this.assignedMediaItems = this.assignedMediaItems.filter(id => id !== mediaItem.id);
      }
    });

    dialogRef.afterClosed().subscribe((selectionConfirmed) => {
      assignedMediaItemSubscribtion.unsubscribe();
      if (!selectionConfirmed) {
        this.assignedMediaItems = [];
      }
    });
  }

  saveMediaGallery() {
    const newGallery = Object.assign({}, this.gallery, {assignedMediaItems: this.assignedMediaItems });
    this.mediaGalleryService.createMediaGallery(newGallery)
      .then(() => this.alertService.showSnackBar('success', 'general.media.gallery.saved'),
        (error: any) => this.alertService.showSnackBar('error', error.message)
      ).catch((error: any) => {
      this.alertService.showSnackBar('error', error.message);
    });
  }

}
