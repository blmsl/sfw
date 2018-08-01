import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ILocation } from '../../../../shared/interfaces/location/location.interface';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ISeason } from '../../../../shared/interfaces/season.interface';

@Component({
  selector: 'match-edit-main',
  templateUrl: './match-edit-main.component.html',
  styleUrls: ['./match-edit-main.component.scss']
})
export class MatchEditMainComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() locations: ILocation[];
  @Input() teams: ITeam[];
  @Input() categories: ICategory[];
  @Input() seasons: ISeason[];

  constructor() {
  }

  ngOnInit() {
  }

}
