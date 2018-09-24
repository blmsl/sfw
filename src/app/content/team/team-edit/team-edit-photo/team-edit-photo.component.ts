import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IUploaderConfig } from '../../../../shared/interfaces/media/uploader-config.interface';
import { IUploaderOptions } from '../../../../shared/interfaces/media/uploader-options.interface';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';

@Component({
  selector: 'team-edit-photo',
  templateUrl: './team-edit-photo.component.html',
  styleUrls: ['./team-edit-photo.component.scss']
})
export class TeamEditPhotoComponent implements OnInit {

  @Input() team: ITeam;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    headerTitle: 'general.teams.edit.photo.title'
  };

  public uploaderOptions: IUploaderOptions = {
    assignedObjects: ['teams', 'profile'],
    itemId: '',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  constructor() { }

  ngOnInit() {
    this.uploaderOptions.itemId = this.team.id;
  }

}
