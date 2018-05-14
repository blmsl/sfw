import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { Upload } from '../../../services/media/upload.class';
import { MediaUploaderService } from '../../../services/media/media-uploader.service';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/index';
import { AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { MediaItemService } from '../../../services/media/media-item.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'media-uploader',
  templateUrl: 'media-uploader.component.html',
  styleUrls: ['media-uploader.component.scss']
})
export class MediaUploaderComponent implements OnInit {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;

  @Output() uploadCompleted: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() unsplashSidebar: EventEmitter<void> = new EventEmitter<void>(false);

  public currentUploads: Upload[] = [];
  public isHovering: boolean;
  public canUpload: boolean = true;

  constructor(public snackBar: MatSnackBar,
    private afs: AngularFirestore,
    private mediaItemService: MediaItemService,
    private mediaUploaderService: MediaUploaderService) {
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

    this.clearQueue();
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
      this.uploadMultipleFiles();
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
      this.currentUploads = [];
    } else {
      this.canUpload = true;
    }
  }

  upload(fileUpload: Upload) {

    // create Id, if not exists
    if (!this.uploaderOptions.id) {
      this.uploaderOptions.id = this.afs.createId();
    }

    fileUpload.task = this.mediaUploaderService.upload(fileUpload, this.uploaderOptions);
    fileUpload.percentage = fileUpload.task.percentageChanges();
    fileUpload.downloadURL = fileUpload.task.downloadURL();

    fileUpload.snapshot = fileUpload.task.snapshotChanges().pipe(
      tap(snapshot => {

        fileUpload.status = snapshot.state;
        fileUpload.isActive = snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;

        if (snapshot.bytesTransferred === snapshot.totalBytes) {
          const snapshotTask = snapshot.task;
          snapshotTask.then((res) => {

            const mediaItem = {
              id: this.uploaderOptions.id,
              file: {
                size: fileUpload.file.size,
                name: fileUpload.file.name,
                type: fileUpload.file.type
              },
              itemID: this.uploaderOptions.itemID,
              downloadURL: res.downloadURL
            };

            this.mediaItemService.createMediaItem(mediaItem).then(
              () => {
                this.uploadCompleted.emit();
                if (this.uploaderConfig.removeAfterUpload) {
                  this.deleteFromQueue(fileUpload);
                  if (this.currentUploads.length === 0) {
                    this.clearQueue();
                  }
                }
              }
            ).catch((error: any) => this.showErrorMessage(error));
          });


        }
      }, (error: any) => {
        this.currentUploads.splice(this.currentUploads.indexOf(fileUpload), 1);
        this.showErrorMessage(error);
      }
      ));
  }

  showErrorMessage(error: any) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        status: 'error',
        message: error.message
      },
      duration: 2500
    });
  }

  uploadSingleFile(fileUpload: Upload) {
    this.upload(fileUpload);
  }

  uploadMultipleFiles() {
    this.currentUploads.forEach((fileUpload: Upload) => this.upload(fileUpload));
  }

  clearQueue(): void {
    this.currentUploads = [];
  }

  deleteFromQueue(upload): void {
    this.currentUploads.splice(this.currentUploads.indexOf(upload), 1);
    this.checkQueueLength();
  }

  pauseUpload(upload: Upload) {
    upload.task.pause();
    upload.status = 'paused';
  }

  resumeUpload(upload: Upload) {
    upload.task.resume();
    upload.status = 'running';
  }

  cancelUpload(upload: Upload) {
    upload.task.cancel();
    upload.status = 'canceled';
  }

  deleteUpload(upload: Upload) {
    const index = this.currentUploads.indexOf(upload);
    this.currentUploads.splice(index, 1);
  }
}
