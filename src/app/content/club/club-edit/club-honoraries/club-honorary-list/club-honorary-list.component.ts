import { Component, Input } from '@angular/core';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';
import { IClub } from '../../../../../shared/interfaces/club/club.interface';

@Component({
  selector: 'club-honorary-list',
  templateUrl: './club-honorary-list.component.html',
  styleUrls: ['./club-honorary-list.component.scss']
})
export class ClubHonoraryListComponent {

  @Input() members: IMember[];
  @Input() club: IClub;

  constructor() {
  }

}
