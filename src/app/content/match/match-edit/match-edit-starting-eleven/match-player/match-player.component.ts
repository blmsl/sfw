import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'match-player',
  templateUrl: './match-player.component.html',
  styleUrls: ['./match-player.component.scss']
})
export class MatchPlayerComponent implements OnInit {

  @Input() members: IMember[];
  @Input() member: IMember;
  @Input() assignedPosition: any;

  constructor() {
  }

  ngOnInit() {
    // console.log(this.assignedPosition);
  }

}
