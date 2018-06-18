import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IClub } from '../../../../../shared/interfaces/club/club.interface';
import { IUploaderConfig } from '../../../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../../shared/interfaces/media/uploader-options.interface';

@Component({
  selector: 'club-management-photo',
  templateUrl: './club-management-photo.component.html',
  styleUrls: ['./club-management-photo.component.scss']
})
export class ClubManagementPhotoComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() club: IClub;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    headerTitle: 'general.clubs.edit.management.current.title'
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['clubs', 'management'],
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
