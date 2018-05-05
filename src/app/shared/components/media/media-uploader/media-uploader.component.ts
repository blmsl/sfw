import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { Upload } from '../../../services/media/upload.class';
import { MediaUploaderService } from '../../../services/media/media-uploader.service';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { tap } from 'rxjs/operators';
import { Observable } from "rxjs/index";

@Component({
  selector: 'media-uploader',
  templateUrl: 'media-uploader.component.html',
  styleUrls: ['media-uploader.component.scss']
})
export class MediaUploaderComponent implements OnInit {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;
  @Input() form: FormGroup;

  @Output() uploadCompleted: EventEmitter<any> = new EventEmitter<any>(false);

  public currentUploads: Upload[] = [];
  public isHovering: boolean;
  public canUpload: boolean = true;
  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  constructor(public snackBar: MatSnackBar,
    private mediaUploaderService: MediaUploaderService) {
    this.uploaderConfig = {
      autoUpload: false
    }
  }

  ngOnInit() {
  }

  handleDrop(fileList: FileList): void {
    const fileArray = Array.from(fileList);
    this.initUploader(fileArray);
  }

  onFileChange($event: any): void {
    const fileArray = Array.from(($event.target as HTMLInputElement).files);
    this.initUploader(fileArray);
  }

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  initUploader(fileArray: File[]): void {
    // const reader = new FileReader();

    for (let i = 0; i < fileArray.length; i++) {
      const fileUpload = new Upload(fileArray[i]);
      this.currentUploads.push(fileUpload);
      /*  Preview
       reader.onload = (event: any) => {
       console.log(event.target);
       file.previewImage = event.target.result;
       };
       // reader.readAsDataURL(file); */
    }

    this.checkQueueLength();

    // Start Auto Upload?
    if (this.canUpload && this.uploaderConfig.autoUpload) {
      this.uploadFiles();
    }
  }

  checkQueueLength() {
    this.uploaderOptions.queueSize = this.currentUploads.length;
    if (this.currentUploads.length > this.uploaderOptions.queueLimit) {
      this.canUpload = false;
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          status: 'error',
          message: 'general.media.filter.queueLimit'
        },
        duration: 2500
      });
    } else {
      this.canUpload = true;
    }
  }

  uploadFiles() {

    this.currentUploads.forEach((fileUpload: Upload) => {

      const uploadTask = this.mediaUploaderService.upload(fileUpload, this.uploaderOptions);

      this.percentage = uploadTask.percentageChanges();
      this.downloadURL = uploadTask.downloadURL();

      this.snapshot = uploadTask.snapshotChanges().pipe(
        tap(snapshot => {

          console.log('changes');
          console.log(fileUpload);

          fileUpload.isActive = snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;

          if (snapshot.bytesTransferred === snapshot.totalBytes) {
            console.log('upload completed');
            this.uploadCompleted.emit(fileUpload);

            if (this.uploaderConfig.removeAfterUpload) {
              this.deleteFromQueue(fileUpload);
              if (this.currentUploads.length === 0) {
                this.clearQueue();
              }
            }

          }
        }, (error: any) => {
          this.currentUploads.splice(this.currentUploads.indexOf(fileUpload), 1);
          this.snackBar.openFromComponent(SnackbarComponent, {
            data: {
              status: 'error',
              message: error.message
            },
            duration: 2500
          });
        }
        ));

      // const mediaItem = this.mediaItemService.setNewMediaItem(upload);
      // return this.mediaItemService.createMediaItem(mediaItem).then(() => {
      //   return mediaItem
      // });
    });
  }

  clearQueue(): void {
    this.currentUploads = [];
    this.form.controls['imageUrl'].reset();
  }

  deleteFromQueue(upload): void {
    this.currentUploads.splice(this.currentUploads.indexOf(upload), 1);
    this.checkQueueLength();
  }
}
