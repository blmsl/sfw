import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUploaderConfig } from '../../../../interfaces/media/uploader-config.interface';
import { MediaUploaderService } from '../../../../services/media/media-uploader.service';
import { IUploaderOptions } from '../../../../interfaces/media/uploader-options.interface';
import { Upload } from '../../../../services/media/upload.class';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'media-upload-form',
  templateUrl: './media-upload-form.component.html',
  styleUrls: [
    'media-upload-form.component.css'
  ]
})
export class MediaUploadFormComponent {

  /*@Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;
  // @Input() currentImageUrl: string;
  @Input() form: FormGroup;

  @Output() uploadCompleted = new EventEmitter(false);
  @Output() removedMedia = new EventEmitter(false);

  public selectedFiles: FileList | null;
  public currentUploads: Upload[] = [];
  public dropZoneActive: boolean = false;

  public optionsForm: FormGroup;

  constructor(public mediaUploaderService: MediaUploaderService) {
  }

  ngOnInit() {
  }

  dropZoneState($event: boolean) {
    this.dropZoneActive = $event;
  }

  handleDrop(fileList: FileList) {
    console.log(fileList);
  }

  onFileChange($event: any) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;

    const fileArray = Array.from(this.selectedFiles);
    this.uploaderOptions.queueSize = fileArray.length;
    fileArray.forEach((file) => {
      const fileUpload = new Upload(file);
      this.currentUploads.push(fileUpload);
    });

    if (this.uploaderConfig.autoUpload) {
      this.uploadFiles();
    }
  }

  clearQueue(): void {
    this.form.controls['imageUrl'].reset();
    this.currentUploads = [];
  }

  deleteMedia(currentImageUrl: string) {
    console.log(currentImageUrl);
    // this.mediaUploaderService.deleteFileStorage(currentImageUrl);
  }

  deleteFromQueue(upload: Upload) {
    this.currentUploads.splice(this.currentUploads.indexOf(upload), 1);
  }

  /*pauseUpload(upload: Upload) {
    upload.task.pause();
  }

  resumeUpload(upload: Upload) {
    upload.task.resume();
  }

  uploadFiles() {
    this.currentUploads.forEach((fileUpload) => {

      this.mediaUploaderService.upload(fileUpload, this.uploaderOptions); /*.then(
        (mediaItem: IMediaItem) => {
          /* fileUpload.isCompleted = true;
          if (this.uploaderConfig.removeAfterUpload) {
            this.currentUploads.splice(this.currentUploads.indexOf(fileUpload), 1);
          }
          this.uploadCompleted.emit(mediaItem);
        },
        (error: any) => console.log(error)
      );
    });
  }*/
}
