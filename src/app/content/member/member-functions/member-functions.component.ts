import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { IClubManagement } from '../../../shared/interfaces/club/club-management.interface';
import { ICategory } from '../../../shared/interfaces/category.interface';

@Component({
  selector: 'member-functions',
  templateUrl: './member-functions.component.html',
  styleUrls: ['./member-functions.component.scss']
})
export class MemberFunctionsComponent implements OnInit {

  @Input() teams: ITeam[];
  @Input() clubs: IClub[];
  @Input() categories: ICategory[];
  @Input() member: IMember;

  private positionList: IClubManagement[];

  constructor() { }

  ngOnInit() {
  }

  getMemberPositionsInClubs(clubs: IClub[]) {
    if (this.positionList)
      return this.positionList;

    let positionList = [];
    for (let i = 0; i < clubs.length; i++) {
      clubs[i].management.positions.filter((position: IClubManagement) => {
        return position.assignedMember === this.member.id;
      }).map((position: IClubManagement) => {
        positionList.push(position);
      });
    }
    this.positionList = positionList;
    return positionList;
  }

}
