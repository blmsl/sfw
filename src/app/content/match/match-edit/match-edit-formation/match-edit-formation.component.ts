import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { MatSelectChange } from '@angular/material';
import { IFormation } from '../../../../shared/interfaces/match/formation.interface';
import { MatchService } from '../../../../shared/services/match/match.service';

@Component({
  selector: 'match-edit-formation',
  templateUrl: './match-edit-formation.component.html',
  styleUrls: ['./match-edit-formation.component.scss']
})
export class MatchEditFormationComponent implements OnInit {

  @Input() assignedTeamPlayers: IMember[];

  public tacticalFormations: IFormation[];
  public assignedFormation: IFormation;

  constructor(private matchService: MatchService) {
    this.tacticalFormations = matchService.getFormations();
  }

  ngOnInit() {
  }

  setFormation($event: MatSelectChange) {
    this.assignedFormation = $event.value;
  }

}
