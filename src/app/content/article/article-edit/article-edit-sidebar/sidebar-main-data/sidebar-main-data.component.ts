import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUser } from '../../../../../shared/interfaces/user/user.interface';
import { IUploaderConfig } from '../../../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../../shared/interfaces/media/uploader-options.interface';
import { IArticle } from '../../../../../shared/interfaces/article.interface';

@Component({
  selector: 'sidebar-main-data',
  templateUrl: './sidebar-main-data.component.html',
  styleUrls: ['./sidebar-main-data.component.scss']
})
export class SidebarMainDataComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() article: IArticle;
  @Input() users: IUser[];

  @Output() uploadCompleted: EventEmitter<string> = new EventEmitter<string>(false);

  public host = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    showHeader: false
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['articles', 'cover'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  constructor() {
  }

  ngOnInit() {
    this.uploaderOptions.itemId = this.article.id;
  }

}
