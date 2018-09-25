import { Observable } from 'rxjs';
import { AngularFireUploadTask } from '@angular/fire/storage';

export class Upload {

  file: File;

  downloadURL: string;
  task: AngularFireUploadTask;
  percentage: Observable<number | undefined>;

  isActive: boolean;

  status: string;
  snapshot: any;

  constructor(file) {
    this.file = file;
  }
}
