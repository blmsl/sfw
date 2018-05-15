import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Injectable } from '@angular/core';
import { FileType } from '../../interfaces/media/file-type.interface';
import { IUploaderOptions } from '../../interfaces/media/uploader-options.interface';
import { Upload } from './upload.class';
import { AuthService } from '../auth/auth.service';


export type FilterFunction = {
  name: string,
  fn: (upload?: Upload, options?: IUploaderOptions) => boolean
};

@Injectable()
export class MediaUploaderService {

  private _failFilterIndex: number;

  public options: IUploaderOptions;

  constructor(private authService: AuthService,
              private storage: AngularFireStorage) {
  }

  public upload(upload: Upload, options: IUploaderOptions): AngularFireUploadTask {

    this.initOptions(options);
    const arrayOfFilters = this._getFilters(this.options.filters ? this.options.filters : []);

    if (this._isValidFile(upload, arrayOfFilters, this.options)) {

      const metaData: any = {
        itemId: options.itemId,
        name: upload.file.name,
        size: upload.file.size,
        type: upload.file.type
      };

      // Use the other upload method from firebase to work with promises
      return this.storage.ref(options.path + '/' + options.itemId + '/' + options.id).put(upload.file, metaData);

    } else {
      const filter: any = arrayOfFilters[this._failFilterIndex];
      console.log(filter);
      throw ({
        message: filter.name,
        file: upload.file.name
      });
    }
  }

  private initOptions(options: IUploaderOptions) {
    this.options = options;

    if (!options.filters) {
      this.options.filters = [];
    }

    if (this.options.queueLimit) {
      this.options.filters.unshift({
        name: 'queueLimit',
        fn: this._queueLimitFilter
      });
    }

    if (this.options.maxFileSize) {
      this.options.filters.unshift({
        name: 'fileSize',
        fn: this._fileSizeFilter
      });
    }

    if (this.options.allowedFileType && this.options.allowedFileType.length > 0) {
      this.options.filters.unshift({
        name: 'fileType',
        fn: this._fileTypeFilter
      });
    }

    if (this.options.allowedMimeType && this.options.allowedMimeType.length > 0) {
      this.options.filters.unshift({
        name: 'mimeType',
        fn: this._mimeTypeFilter
      });
    }
  }

  private _getFilters(filters: FilterFunction[] | string): FilterFunction[] {
    if (!filters) {
      return this.options.filters ? this.options.filters : [];
    }
    if (Array.isArray(filters)) {
      return filters;
    }

    const names = filters.match(/[^\s,]+/g);
    return this.options.filters.filter((filter: any) => names.indexOf(filter.name) !== -1);
  }

  private _queueLimitFilter(): boolean {
    return this.options.queueLimit === undefined || this.options.queueSize <= this.options.queueLimit;
  }

  private _fileSizeFilter(upload: Upload): boolean {
    return !(this.options.maxFileSize && upload.file.size > this.options.maxFileSize);
  }

  private _mimeTypeFilter(upload: Upload): boolean {
    console.log('filter mimeType ' + upload.file.type + ' --> ' + !(this.options.allowedMimeType.indexOf(upload.file.type) === -1));
    return !(this.options.allowedMimeType.indexOf(upload.file.type) === -1);
  }

  private _fileTypeFilter(upload: Upload): boolean {
    console.log('filter fileType ' + FileType.getMimeClass(upload.file) + ' --> ' + !(this.options.allowedFileType.indexOf(FileType.getMimeClass(upload.file)) === -1));
    return !(this.options.allowedFileType.indexOf(FileType.getMimeClass(upload.file)) === -1);
  }

  private _isValidFile(file: Upload, filters: FilterFunction[], options: IUploaderOptions): boolean {
    this._failFilterIndex = -1;
    return !filters.length ? true : filters.every((filter: FilterFunction) => {
      this._failFilterIndex++;
      return filter.fn.call(this, file, options);
    });
  }

}
