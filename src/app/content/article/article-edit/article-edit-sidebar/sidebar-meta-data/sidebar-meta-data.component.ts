import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUploaderConfig } from '../../../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../../shared/interfaces/media/uploader-options.interface';
import { IArticle } from '../../../../../shared/interfaces/article.interface';

@Component({
  selector: 'sidebar-meta-data',
  templateUrl: './sidebar-meta-data.component.html',
  styleUrls: ['./sidebar-meta-data.component.scss']
})
export class SidebarMetaDataComponent implements OnInit, OnChanges {

  @Input() form: FormGroup;
  @Input() article: IArticle;

  @Output() uploadCompleted: EventEmitter<string> = new EventEmitter<string>(false);

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    showHeader: false
  };

  public metaUploaderOptions: IUploaderOptions = {
    assignedObjects: ['articles', 'meta'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  public facebookUploaderOptions: IUploaderOptions = {
    assignedObjects: ['articles', 'facebook'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  public twitterUploaderOptions: IUploaderOptions = {
    assignedObjects: ['articles', 'twitter'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  constructor() {
  }

  ngOnInit() {
    /* this.facebookUploaderOptions.itemId
      = this.metaUploaderOptions.itemId
      = this.twitterUploaderOptions.itemId
      = this.article.id; */
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.article.currentValue.id) {
      this.facebookUploaderOptions.itemId
        = this.metaUploaderOptions.itemId
        = this.twitterUploaderOptions.itemId
        = changes.article.currentValue.id;
    }
  }

  public step: number = 0;

  setStep(index: number) {
    this.step = index;
  }

}
