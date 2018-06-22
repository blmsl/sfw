import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { IUploaderOptions } from '../../../../shared/interfaces/media/uploader-options.interface';
import { IUploaderConfig } from '../../../../shared/interfaces/media/uploader-config.interface';

@Component({
  selector: 'member-edit-main',
  templateUrl: './member-edit-main.component.html',
  styleUrls: ['./member-edit-main.component.scss']
})
export class MemberEditMainComponent implements OnInit {

  @Input() member: IMember;
  @Input() form: FormGroup;

  @ViewChild('comment') comment: QuillEditorComponent;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    headerTitle: 'general.members.edit.photo.title'
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['members', 'profile'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  constructor() { }

  ngOnInit() {
    this.uploaderOptions.itemId = this.member.id;
  }

}
