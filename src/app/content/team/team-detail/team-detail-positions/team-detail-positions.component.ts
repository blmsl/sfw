import { Component, Input } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';

@Component({
  selector: 'team-detail-positions',
  templateUrl: './team-detail-positions.component.html',
  styleUrls: ['./team-detail-positions.component.scss']
})
export class TeamDetailPositionsComponent {

  @Input() team: ITeam;
  @Input() members: IMember[];
  @Input() categories: ICategoryType[];

  public savedPosition: string;

  constructor() {
  }

  isSavedPosition(position: string){
    if(position !== this.savedPosition) {
      this.savedPosition = position;
      return false;
    }
    return true;
  }

}
