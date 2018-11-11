import { Component, OnInit } from '@angular/core';
import { IUploaderConfig } from '../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../shared/interfaces/media/uploader-options.interface';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html'
})
export class UploaderComponent implements OnInit {

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: true,
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: [],
    itemId: '',
    queueLimit: 25,
  };

  constructor() {
  }

  ngOnInit() {
  }

}
