import { Observable } from 'rxjs';
import { AngularFireUploadTask } from 'angularfire2/storage';

export class Upload {

  file: File;

  downloadURL: Observable<string | null>;
  task: AngularFireUploadTask;
  percentage: Observable<number | undefined>;

  isActive: boolean;

  status: string;
  snapshot: any;

  constructor(file) {
    this.file = file;
  }
}
