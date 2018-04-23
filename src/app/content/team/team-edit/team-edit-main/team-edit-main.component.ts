import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ISeason } from '../../../../shared/interfaces/season.interface';
import { IClub } from '../../../../shared/interfaces/club/club.interface';

@Component({
  selector: 'team-edit-main',
  templateUrl: './team-edit-main.component.html',
  styleUrls: ['./team-edit-main.component.scss']
})
export class TeamEditMainComponent {

  @Input() form: FormGroup;
  @Input() categoryTypes: ICategoryType[];
  @Input() categories: ICategory[];
  @Input() seasons: ISeason[];
  @Input() clubs: IClub[];

  public titleMaxLength: number = 50;
  public shortTitleMaxLength: number = 25;

  constructor() {
  }

}
