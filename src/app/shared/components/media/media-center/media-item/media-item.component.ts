import { Component, Input, OnInit } from '@angular/core';
import { IMediaItem } from '../../../../interfaces/media/media-item.interface';
import { MediaItemService } from '../../../../services/media/media-item.service';
import { AlertService } from '../../../../services/alert/alert.service';
import { MediaItemInfoComponent } from '../media-item-info/media-item-info.component';
import { MatDialog } from '@angular/material';
import { IMediaGallery } from '../../../../interfaces/media/media-gallery.interface';
import { MediaGalleryService } from '../../../../services/media/media-gallery.service';
import { DeleteConfirmDialogComponent } from '../../../dialogs/delete-confirm-dialog/delete-confirm-dialog.component';
import { MediaShowItemComponent } from '../media-show-item/media-show-item.component';

@Component({
  selector: 'media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.scss']
})
export class MediaItemComponent implements OnInit {

  @Input() mediaItem: IMediaItem;
  @Input() mediaGallery: IMediaGallery;
  @Input() selected: boolean;
  @Input() showCoverBtn: boolean;

  constructor(private mediaItemService: MediaItemService,
    private mediaGalleryService: MediaGalleryService,
    private alertService: AlertService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showRemoveDialog(mediaItem: IMediaItem, mediaGallery: IMediaGallery): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      hasBackdrop: true,
      panelClass: 'delete-dialog',
      data: {
        mediaItem: mediaItem,
        mediaGallery: mediaGallery
      }
    });

    dialogRef.afterClosed().subscribe((data: {
      removedMediaItem: IMediaItem,
      deleteFromFS: boolean
    }) => {
      if (data) {

        const tasks: any[] = [];

        if (data.deleteFromFS) {
          tasks.push(this.mediaItemService.removeMediaItem(this.mediaItem.id));
        }

        if (this.mediaGallery) {
          this.mediaGallery.assignedMediaItems.splice(this.mediaGallery.assignedMediaItems.indexOf(this.mediaItem.id), 1);
          tasks.push(this.mediaGalleryService.updateMediaGallery(this.mediaGallery));
        }

        Promise.all(tasks).then(
          () => this.alertService.showSnackBar('success', 'general.media.upload.file.deleted'),
          (error: any) => this.alertService.showSnackBar('error', error.message)
        ).catch((error: any) => this.alertService.showSnackBar('error', error.message));

      }
    });
  }

  showInfoDialog(mediaItem: IMediaItem): void {
    const dialogRef = this.dialog.open(MediaItemInfoComponent, {
      data: {
        mediaItem
      }
    });

    dialogRef.afterClosed().subscribe((updatedMediaItem: IMediaItem) => {
      if (updatedMediaItem) {
        this.mediaItemService.updateMediaItem(updatedMediaItem).then(
          () => this.alertService.showSnackBar('success', 'general.media.upload.file.edit.saved'),
          (error: any) => this.alertService.showSnackBar('error', error.message)
        ).catch((error: any) => this.alertService.showSnackBar('error', error.message));
      }
    });
  }

  showFileDialog(mediaItem: IMediaItem): void {
    this.dialog.open(MediaShowItemComponent, {
      data: {
        mediaItem
      }
    });
  }

  setAsCover(mediaItem: IMediaItem, mediaGallery: IMediaGallery): void {
    mediaGallery.coverImage = this.mediaItem.id;
    this.mediaGalleryService.updateMediaGallery(mediaGallery).then(
      () => this.alertService.showSnackBar('success', 'general.media.gallery.coverSaved'),
      (error: any) => this.alertService.showSnackBar('error', error.message)
    ).catch((error: any) => this.alertService.showSnackBar('error', error.message));
  }

}
