import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { Upload } from '../../../services/media/upload.class';
import { MediaUploaderService } from '../../../services/media/media-uploader.service';
import { MatSnackBar } from '@angular/material';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { MediaItemService } from '../../../services/media/media-item.service';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { AlertService } from '../../../services/alert/alert.service';
import { FileType } from '../../../interfaces/media/file-type.interface';

@Component({
  selector: 'media-uploader',
  templateUrl: 'media-uploader.component.html',
  styleUrls: ['media-uploader.component.scss']
})
export class MediaUploaderComponent implements OnInit {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;
  @Input() currentImage: string | null;

  @Output() uploadCompleted: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() unsplashSidebar: EventEmitter<void> = new EventEmitter<void>(false);

  public currentUploads: Upload[] = [];
  public isHovering: boolean;
  public canUpload: boolean = true;
  public env;

  constructor(public snackBar: MatSnackBar,
    private alertService: AlertService,
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
      this.uploadMultipleFiles().then(
        () => this.alertService.showSnackBar('success', 'general.media.uploader.finishedAll')
      );
    }
  }

  checkQueueLength() {
    this.uploaderOptions.queueSize = this.currentUploads.length;
    if (this.currentUploads.length > this.uploaderOptions.queueLimit) {
      this.canUpload = false;
      this.alertService.showSnackBar('error', 'general.media.filter.queueLimit');
      this.currentUploads = [];
    } else {
      this.canUpload = true;
    }
  }

  upload(fileUpload: Upload, id: string): Promise<any> {

    // create Id, if not exists
    if (!this.uploaderOptions.id) {
      this.uploaderOptions.id = this.afs.createId();
    }

    fileUpload.task = this.mediaUploaderService.upload(fileUpload, this.uploaderOptions);
    fileUpload.percentage = fileUpload.task.percentageChanges();

    return fileUpload.task
      .then()
      .then((snapshot) => {
        fileUpload.status = snapshot.state;
        fileUpload.isActive = snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;

        if (snapshot.bytesTransferred === snapshot.totalBytes) {
          const snapshotTask = snapshot.task;
          return snapshotTask;
        }
      })
      .then((res: any) => {

        fileUpload.downloadURL = res.downloadURL;
        const mediaItem: IMediaItem = {
          id: id,
          file: {
            size: fileUpload.file.size,
            name: fileUpload.file.name,
            type: fileUpload.file.type,
          },
          itemId: this.uploaderOptions.itemId,
          downloadURL: res.downloadURL,
          path: res.metadata.fullPath
        };
        return mediaItem;
      })
      .then((mediaItem: IMediaItem) => {
        console.log(mediaItem);
        return this.mediaItemService.createMediaItem(mediaItem);
      })
      .then(() => {
        this.alertService.showSnackBar('success', 'general.media.uploader.singleFinished');
        if (this.uploaderConfig.removeAfterUpload) {
          this.deleteFromQueue(fileUpload);
          if (this.currentUploads.length === 0) {
            this.clearQueue();
          }
        }
      })
      .catch((error: any) => {
        this.currentUploads.splice(this.currentUploads.indexOf(fileUpload), 1);
        this.alertService.showSnackBar('error', error.message);
      });
  }

  uploadSingleFile(fileUpload: Upload, id?: string) {
    if (!id) {
      id = this.uploaderOptions.id;
    }
    this.upload(fileUpload, id).then(() => {
      this.uploadCompleted.emit();
    });
  }

  async uploadMultipleFiles() {
    const promises: Promise<any>[] = [];

    this.currentUploads.forEach((fileUpload: Upload) => {
      if (this.currentUploads.length >= 1 && !this.uploaderOptions.id) {
        this.uploaderOptions.id = this.afs.createId();
      }
      promises.push(this.upload(fileUpload, this.uploaderOptions.id));
    });

    // after pushed all promises from upload, wait till all are done and then emit the completion
    Promise.all(promises).then(() => {
      this.uploadCompleted.emit();
    });
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

  isImage(file: any) {
    return FileType.getMimeClass(file) === 'image';
  }

  removeMediaItem(mediaItem: IMediaItem) {
    console.log(mediaItem);
  }
}
