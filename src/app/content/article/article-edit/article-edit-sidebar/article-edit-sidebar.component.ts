import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';
import { ILocation } from '../../../../shared/interfaces/location.interface';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { ISeason } from '../../../../shared/interfaces/season.interface';
import { IMatch } from '../../../../shared/interfaces/match.interface';
import { ApplicationService } from '../../../../shared/services/application/application.service';
import { IUser } from '../../../../shared/interfaces/user/user.interface';

@Component({
  selector: 'article-edit-sidebar',
  templateUrl: './article-edit-sidebar.component.html',
  styleUrls: ['./article-edit-sidebar.component.scss']
})
export class ArticleEditSidebarComponent {

  @Input() notifications: MatSidenav;
  @Input() form: FormGroup;
  @Input() categories: ICategory[];
  @Input() categoryTypes: ICategoryType[];
  @Input() locations: ILocation[];
  @Input() users: IUser[];
  @Input() seasons: ISeason[];
  @Input() teams: ITeam[];

  @Output() remove: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(public applicationService: ApplicationService) {
  }

}
