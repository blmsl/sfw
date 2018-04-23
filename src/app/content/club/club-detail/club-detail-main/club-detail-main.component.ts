import { Component, Input, OnInit } from '@angular/core';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { ILocation } from '../../../../shared/interfaces/location.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'club-detail-main',
  templateUrl: './club-detail-main.component.html',
  styleUrls: ['./club-detail-main.component.scss']
})
export class ClubDetailMainComponent implements OnInit {

  @Input() club: IClub;
  @Input() locations: ILocation[];
  @Input() members: IMember[];

  constructor() { }

  ngOnInit() {
  }

}
