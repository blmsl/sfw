import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                                from '@angular/core';
import { IUploaderOptions }      from '../../../interfaces/media/uploader-options.interface';
import { Upload }                from '../../../services/media/upload.class';
import { MediaUploaderService }  from '../../../services/media/media-uploader.service';
import { SnackbarComponent }     from '../../snackbar/snackbar.component';
import { MatSnackBar }           from '@angular/material';
import { IUploaderConfig }       from '../../../interfaces/media/uploader-config.interface';
import { tap }                   from 'rxjs/operators';
import { Observable }            from 'rxjs/index';
import { AngularFireUploadTask } from 'angularfire2/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection
}                                from 'angularfire2/firestore';
import { IMediaItem }            from '../../../interfaces/media/media-item.interface';

@Component({
  selector: 'media-uploader',
  templateUrl: 'media-uploader.component.html',
  styleUrls: [ 'media-uploader.component.scss' ]
})
export class MediaUploaderComponent implements OnInit {

  @Input() uploaderOptions: IUploaderOptions;
  @Input() uploaderConfig: IUploaderConfig;

  @Output() uploadCompleted: EventEmitter<any> = new EventEmitter<any>(false);

  public currentUploads: Upload[] = [];
  public isHovering: boolean;
  public canUpload: boolean = true;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;

  constructor(public snackBar: MatSnackBar,
              private afs: AngularFirestore,
              private mediaUploaderService: MediaUploaderService,
              private fireStore: AngularFirestore) {
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
      const fileUpload = new Upload(fileArray[ i ]);
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
      this.currentUploads = [];
    } else {
      this.canUpload = true;
    }
  }

  uploadFiles() {

    this.currentUploads.forEach((fileUpload: Upload) => {

      if(!this.uploaderOptions.itemID){
        this.uploaderOptions.itemID = this.afs.createId();
      }

      this.task = this.mediaUploaderService.upload(fileUpload, this.uploaderOptions);

      this.percentage = this.task.percentageChanges();
      this.downloadURL = this.task.downloadURL();

      this.snapshot = this.task.snapshotChanges().pipe(
        tap(snapshot => {

            fileUpload.isActive = snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;

            if (snapshot.bytesTransferred === snapshot.totalBytes) {
              const snapshotTask = snapshot.task;
              snapshotTask.then((res) => {
                console.log(fileUpload);
                console.log(res);

                const list: AngularFirestoreCollection<IMediaItem> = this.fireStore.collection('files');
                list.add({
                  file: {
                    size: fileUpload.file.size,
                    name: fileUpload.file.name,
                    type: fileUpload.file.type
                  },
                  itemID: this.uploaderOptions.itemID,
                  downloadURL: res.downloadURL
                });

                this.uploadCompleted.emit();
              });


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
    //this.form.controls['imageUrl'].reset();
  }

  deleteFromQueue(upload): void {
    this.currentUploads.splice(this.currentUploads.indexOf(upload), 1);
    this.checkQueueLength();
  }
}
