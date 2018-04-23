import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUploaderConfig } from '../../../interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../interfaces/media/uploader-options.interface';

@Component({
  selector: 'media-center',
  templateUrl: 'media-center.component.html',
  styleUrls: [
    'media-center.component.css'
  ]
})

export class MediaCenterComponent implements OnInit {

  @Input() uploaderOptions: IUploaderOptions;
  // @Input() uploaderConfig: IUploaderConfig;
  @Input() form: FormGroup;

  @Output() uploadCompleted = new EventEmitter(false);
  @Output() removedMedia = new EventEmitter(false);

  /* @Input() objectId: string;
  @Input() objectType: string;
  @Input() uploaderOptions: any;
  @Input() showUploader: boolean = false;
  @Input() showGalleryForm: boolean = false;
  @Output() notifyParentComponent = new EventEmitter(false);

  // public selectedMediaGallery: IMediaGallery; */

  constructor(/* public mediaItemService: MediaItemService,
    public mediaGalleryService: MediaGalleryService */) {
  }

  ngOnInit() {
  }

}
