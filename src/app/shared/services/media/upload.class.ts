import { Observable } from 'rxjs';

export class Upload {

  file: File;

  downloadUrl$: Observable<string> | string;
  percentage$: Observable<number>;
  isActive: boolean;
  error: Observable<any>;

  /*
  assignedObjects: {
    id: string;
    type: string;
  }[];

  previewImage: string;
  snapshot: Observable<any>; */

  constructor(file) {
    this.file = file;
  }
}
