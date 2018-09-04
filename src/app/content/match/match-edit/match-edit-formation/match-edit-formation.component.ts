import {
  Component,
  Input,
  OnInit
}                                from '@angular/core';
import { IMember }               from '../../../../shared/interfaces/member/member.interface';
import { MatSelectChange }       from '@angular/material';
import { IFormation }            from '../../../../shared/interfaces/match/formation.interface';
import { IMatch }                from '../../../../shared/interfaces/match/match.interface';
import { MatchFormationService } from '../../../../shared/services/match/match-formation.service';

@Component({
  selector: 'match-edit-formation',
  templateUrl: './match-edit-formation.component.html',
  styleUrls: [ './match-edit-formation.component.scss' ]
})
export class MatchEditFormationComponent implements OnInit {

  @Input() assignedTeamPlayers: IMember[];
  @Input() match: IMatch;

  public tacticalFormations: IFormation[];
  public assignedFormation: IFormation;

  constructor(private matchFormationService: MatchFormationService) {
    this.tacticalFormations = matchFormationService.getFormations();
  }

  ngOnInit() {
  }

  setFormation($event: MatSelectChange) {
    this.assignedFormation = $event.value;
  }

}
