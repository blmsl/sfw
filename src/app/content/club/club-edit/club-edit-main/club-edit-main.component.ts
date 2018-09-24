import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ILocation } from '../../../../shared/interfaces/location/location.interface';
import { QuillEditorComponent } from 'ngx-quill';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { IUploaderConfig } from '../../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../shared/interfaces/media/uploader-options.interface';
import { IClub } from '../../../../shared/interfaces/club/club.interface';

@Component({
  selector: 'club-edit-main',
  templateUrl: './club-edit-main.component.html'
})
export class ClubEditMainComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() club: IClub;
  @Input() locations: ILocation[];
  @Input() members: IMember[];

  @ViewChild('description') description: QuillEditorComponent;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    headerTitle: 'general.clubs.edit.logoUrl'
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['clubs', 'profile'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  constructor() {
  }

  ngOnInit() {
    this.uploaderOptions.itemId = this.club.id;
  }

}
