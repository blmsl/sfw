import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';
import { Upload } from '../../../services/media/upload.class';
import { MediaUploaderService } from '../../../services/media/media-uploader.service';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { MediaItemService } from '../../../services/media/media-item.service';
import { IMediaItem } from '../../../interfaces/media/media-item.interface';
import { AlertService } from '../../../services/alert/alert.service';
import { AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import {
  Observable,
  of
} from 'rxjs/index';

@Component({
  selector: 'media-uploader',
  templateUrl: 'media-uploader.component.html',
  styleUrls: ['media-uploader.component.scss']
})
export class MediaUploaderComponent implements OnInit {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;

  // return created ID
  @Output() uploadCompleted: EventEmitter<string> = new EventEmitter<string>(false);
  // @Output() unsplashSidebar: EventEmitter<void> = new EventEmitter<void>(false);

  @ViewChild('fileInput') fileInput: ElementRef;

  public currentUploads: Upload[] = [];
  public isHovering: boolean;
  public canUpload: boolean = true;
  public env;
  public currentMediaItem: Observable<IMediaItem>;

  constructor(private alertService: AlertService,
    private afs: AngularFirestore,
    private el: ElementRef,
    private mediaItemService: MediaItemService,
    private mediaUploaderService: MediaUploaderService) {
  }

  ngOnInit() {
    console.log(this.uploaderOptions.queueLimit);
    if (this.uploaderOptions.queueLimit === 1) {
      this.currentMediaItem = this.mediaItemService.getCurrentImage(
        this.uploaderOptions.assignedObjects,
        this.uploaderOptions.itemId ? this.uploaderOptions.itemId : ''
      );
    }
  }

  changeFileInput() {
    this.fileInput.nativeElement.click();
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

    for (let i = 0; i < fileArray.length; i++) {
      const fileUpload = new Upload(fileArray[i]);
      this.currentUploads.push(fileUpload);
    }

    this.checkQueueLength();

    // Start Auto Upload?
    if (this.canUpload && this.uploaderConfig.autoUpload) {
      this.uploadMultipleFiles()
        // .then(() => this.alertService.showSnackBar('success', 'general.uploader.finishedAll'))
        .catch((error: any) => {
          this.alertService.showSnackBar('error', 'general.uploader.errors.' + error.message);
        });
    }
  }

  checkQueueLength() {
    this.uploaderOptions.queueSize = this.currentUploads.length;
    if (this.currentUploads.length > this.uploaderOptions.queueLimit) {
      this.canUpload = false;
      this.alertService.showSnackBar('error', 'general.uploader.errors.queueLimit');
      this.currentUploads = [];
    } else {
      this.canUpload = true;
    }
  }

  upload(fileUpload: Upload, id: string): Promise<void> {

    // create Id, if not exists
    if (!this.uploaderOptions.itemId) {
      console.log(this.uploaderOptions.itemId);
      this.uploaderOptions.itemId = this.afs.createId();
    }

    const upload: {
      task: AngularFireUploadTask,
      fileRef: AngularFireStorageReference
    } = this.mediaUploaderService.upload(fileUpload, this.uploaderOptions);

    fileUpload.percentage = upload.task.percentageChanges();

    return upload.task.then((snapshot) => {
      fileUpload.status = snapshot.state;
      fileUpload.isActive = snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;

      upload.fileRef.getDownloadURL().subscribe((downloadURL: string) => {

        let assignedObjects = {};
        let toArray = Object.values(this.uploaderOptions.assignedObjects);
        for (let i = 0; i < toArray.length; i++) {
          assignedObjects[<string>toArray[i]] = true;
        }

        const mediaItem: IMediaItem = {
          assignedObjects: assignedObjects,
          file: {
            size: fileUpload.file.size,
            name: fileUpload.file.name,
            type: fileUpload.file.type,
          },
          itemId: this.uploaderOptions.itemId,
          downloadURL: downloadURL,
        };
        this.mediaItemService.createMediaItem(mediaItem).then(() => {
          this.alertService.showSnackBar('success', 'general.uploader.singleFinished');

          if (this.uploaderOptions.queueLimit === 1) {
            this.currentMediaItem = this.mediaItemService.getCurrentImage(
              this.uploaderOptions.assignedObjects,
              mediaItem.itemId
            );
          }

          this.uploadCompleted.emit(mediaItem.itemId);
          if (this.uploaderConfig.removeAfterUpload) {
            this.deleteFromQueue(fileUpload);
            if (this.currentUploads.length === 0) {
              this.clearQueue();
            }
          }
        });
      });
    }).catch((error: any) => {
      this.currentUploads.splice(this.currentUploads.indexOf(fileUpload), 1);
      this.alertService.showSnackBar('error', 'general.uploader.errors.' + error.message);
    });
  }

  uploadSingleFile(fileUpload: Upload, itemId?: string) {
    if (!itemId) {
      itemId = this.uploaderOptions.itemId;
    }
    this.upload(fileUpload, itemId).then(() => {
      // this.uploadCompleted.emit();
    });
  }

  async uploadMultipleFiles() {
    const promises: Promise<any>[] = [];

    this.currentUploads.forEach((fileUpload: Upload) => {
      if (this.currentUploads.length >= 1 && !this.uploaderOptions.itemId) {
        this.uploaderOptions.itemId = this.afs.createId();
      }
      promises.push(this.upload(fileUpload, this.uploaderOptions.itemId));
    });

    Promise.all(promises).then(() => {
      // this.uploadCompleted.emit();
    });
  }

  clearQueue(): void {
    this.currentUploads = [];
  }

  deleteFromQueue(upload): void {
    this.currentUploads.splice(this.currentUploads.indexOf(upload), 1);
    this.checkQueueLength();
  }

  pauseUpload(upload: Upload): boolean {
    upload.status = 'paused';
    return upload.task.pause();
  }

  resumeUpload(upload: Upload): boolean {
    upload.status = 'running';
    return upload.task.resume();
  }

  cancelUpload(upload: Upload): boolean {
    upload.status = 'canceled';
    return upload.task.cancel();
  }

  deleteUpload(upload: Upload) {
    const index = this.currentUploads.indexOf(upload);
    this.currentUploads.splice(index, 1);
  }

  removeMediaItem() {
    console.log(this.currentMediaItem);
  }

}
