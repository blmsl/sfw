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
    removeAfterUpload: true,
    showQueue: true
  };

  public uploaderOptions: IUploaderOptions = {
    itemId: '',
    path: 'not-categorized',
    queueLimit: 25
  };

  constructor(private afs: AngularFirestore, private snackBar: MatSnackBar) {
    // const id = afs.createId();
    // this.uploaderOptions.id = id;
    // this.uploaderOptions.path += '/' + id;
  }

  ngOnInit() {
  }

  uploadCompleted(): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        status: 'success',
        message: 'general.media.uploader.successfulUpload'
      },
      duration: 2500
    });
  }

  uploadError($event: any): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        status: 'error',
        message: $event
      },
      duration: 2500
    });
  }
}
