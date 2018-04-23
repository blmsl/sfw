import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { ISeason } from '../../../../shared/interfaces/season.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { IClub } from '../../../../shared/interfaces/club/club.interface';

@Component({
  selector: 'team-detail-main',
  templateUrl: './team-detail-main.component.html',
  styleUrls: ['./team-detail-main.component.scss']
})
export class TeamDetailMainComponent implements OnInit {

  @Input() team: ITeam;
  @Input() seasons: ISeason[];
  @Input() clubs: IClub[];
  @Input() categories: ICategory[];

  constructor() { }

  ngOnInit() {
  }

}
