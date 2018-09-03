import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'match-edit-playerlist',
  templateUrl: './match-edit-playerlist.component.html',
  styleUrls: ['./match-edit-playerlist.component.scss']
})
export class MatchEditPlayerlistComponent implements OnInit {

  @Input() assignedTeamPlayers: IMember[];

  constructor() { }

  ngOnInit() {
  }

}
