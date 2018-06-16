import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ISeason } from '../../../../shared/interfaces/season.interface';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { IUploaderOptions } from '../../../../shared/interfaces/media/uploader-options.interface';
import { IUploaderConfig } from '../../../../shared/interfaces/media/uploader-config.interface';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { TeamService } from '../../../../shared/services/team/team.service';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';

@Component({
  selector: 'team-edit-main',
  templateUrl: './team-edit-main.component.html',
  styleUrls: ['./team-edit-main.component.scss']
})
export class TeamEditMainComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() team: ITeam;
  @Input() categoryTypes: ICategoryType[];
  @Input() categories: ICategory[];
  @Input() seasons: ISeason[];
  @Input() clubs: IClub[];

  public titleMaxLength: number = 50;
  public shortTitleMaxLength: number = 25;

  public uploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    headerTitle: 'general.teams.edit.photo.title'
  };

  public uploaderOptions: IUploaderOptions = {
    id: 'teamImage',
    itemId: '',
    path: 'teams',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  public logoUploaderConfig: IUploaderConfig = {
    autoUpload: true,
    showDropZone: true,
    removeAfterUpload: true,
    showQueue: false,
    headerTitle: 'general.teams.edit.logo.title'
  };

  public logoUploaderOptions: IUploaderOptions = {
    id: 'logo',
    itemId: '',
    path: 'teams',
    queueLimit: 1,
    allowedMimeType: ['image/jpeg', 'image/gif', 'image/png']
  };

  constructor() {
  }

  ngOnInit(){
    this.uploaderOptions.itemId = this.logoUploaderOptions.itemId = this.team.id;
  }

  uploadCompleted(){
  }

}
