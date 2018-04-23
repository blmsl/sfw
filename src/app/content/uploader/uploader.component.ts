import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUploaderConfig } from '../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../shared/interfaces/media/uploader-options.interface';
import { IMediaItem } from '../../shared/interfaces/media/media-item.interface';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html'
})
export class UploaderComponent implements OnInit {

  public form: FormGroup;
  public uploaderConfig: IUploaderConfig = {
    showOptions: false,
    autoUpload: false,
    showDropZone: true,
    multiple: false,
    removeAfterUpload: true,
    showQueue: false
  };

  public uploaderOptions: IUploaderOptions = {
    queueLimit: 1,
    path: '',
    id: ''
  };

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      imageUrl: '',
      uploaderConfig: this.initUploaderConfig()
    });

    this.form.valueChanges.subscribe((changes: any) => {
      delete changes.imageUrl;
      this.uploaderConfig = changes.options;
    });
  }

  initUploaderConfig() {
    return this.fb.group(this.uploaderConfig);
  }

  uploadCompleted(mediaItem: IMediaItem): void {
    console.log(mediaItem);
  }

  removedMedia($event): void {
    console.log($event);
  }

}
