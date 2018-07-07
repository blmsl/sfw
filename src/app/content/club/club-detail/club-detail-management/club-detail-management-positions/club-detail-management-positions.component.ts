import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';
import { ICategory } from '../../../../../shared/interfaces/category.interface';
import { IClub } from '../../../../../shared/interfaces/club/club.interface';

@Component({
  selector: 'club-detail-management-positions',
  templateUrl: './club-detail-management-positions.component.html',
  styleUrls: ['./club-detail-management-positions.component.scss']
})
export class ClubDetailManagementPositionsComponent implements OnInit {

  @Input() members: IMember[];
  @Input() positions: ICategory[];
  @Input() club: IClub;

  public step = -1;

  constructor() {
  }

  ngOnInit() {
  }

  setStep(i: number) {
    this.step = i;
  }

}
