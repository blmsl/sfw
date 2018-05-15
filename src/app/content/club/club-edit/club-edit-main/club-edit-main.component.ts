import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ILocation } from '../../../../shared/interfaces/location.interface';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { IUploaderConfig } from '../../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../shared/interfaces/media/uploader-options.interface';

@Component({
  selector: 'club-edit-main',
  templateUrl: './club-edit-main.component.html'
})
export class ClubEditMainComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() locations: ILocation[];
  @Input() members: IMember[];

  @Output() logoUploadCompleted: EventEmitter<any> = new EventEmitter<any>(false);

  @ViewChild('description') description: QuillEditorComponent;

  constructor() {
  }

  ngOnInit() {
  }

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false
  };

  public uploaderOptions: IUploaderOptions = {
    itemId: '123',
    allowedMimeType: ['image.*'],
    allowedFileType: ['jpeg', 'jpg', 'gif', 'bmp', 'png'],
    queueLimit: 1
  };

}
