import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';
import { ILocation } from '../../../../../shared/interfaces/location.interface';
import { ISeason } from '../../../../../shared/interfaces/season.interface';
import { ITeam } from '../../../../../shared/interfaces/team/team.interface';
import { ICategory } from '../../../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../../../shared/interfaces/category-type.interface';

@Component({
  selector: 'sidebar-main-data',
  templateUrl: './sidebar-main-data.component.html',
  styleUrls: ['./sidebar-main-data.component.scss']
})
export class SidebarMainDataComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() categories: ICategory[];
  @Input() categoryTypes: ICategoryType[];
  @Input() locations: ILocation[];
  @Input() members: IMember[];
  @Input() seasons: ISeason[];
  @Input() teams: ITeam[];

  @Output() remove: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor() {
  }

  ngOnInit() {
  }

}
