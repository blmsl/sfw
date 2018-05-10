import {
  Component,
  OnInit
} from '@angular/core';
import { IUploaderConfig } from '../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../shared/interfaces/media/uploader-options.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html'
})
export class UploaderComponent implements OnInit {

  public uploaderConfig: IUploaderConfig = {
    autoUpload: false,
    showDropZone: true,
    multiple: true,
    removeAfterUpload: true,
    showQueue: true
  };

  public uploaderOptions: IUploaderOptions = {
    allowedMimeType: [],
    allowedFileType: [],
    itemID: '',
    path: 'not-categorized',
    queueLimit: 4
  };

  constructor(private afs: AngularFirestore, private snackBar: MatSnackBar) {
    const id = afs.createId();
    this.uploaderOptions.id = id;
    this.uploaderOptions.path += '/' + id;
  }

  ngOnInit() {
  }

  uploadCompleted(): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        status: 'success',
        message: 'upload.successful'
      },
      duration: 2500
    });
  }
}
