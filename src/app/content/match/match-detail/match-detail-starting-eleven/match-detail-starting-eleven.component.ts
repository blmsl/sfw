import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { IFormation } from '../../../../shared/interfaces/match/formation.interface';
import { MatchService } from '../../../../shared/services/match/match.service';

@Component({
  selector: 'match-detail-starting-eleven',
  templateUrl: './match-detail-starting-eleven.component.html',
  styleUrls: []
})
export class MatchDetailStartingElevenComponent implements OnInit {

  @Input() match: IMatch;
  @Input() assignedPlayers: IMember[];
  @Input() assignedSubstitutes: IMember[];

  public tacticalFormations: IFormation[];

  constructor(private matchService: MatchService) {
    // this.tacticalFormations = matchService.getFormations();
  }

  ngOnInit() {
  }

}
