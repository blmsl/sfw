import {
  Component,
  Input,
  OnInit
}                            from '@angular/core';
import { IFormation }        from '../../../../../shared/interfaces/match/formation.interface';
import { SkyhookDndService } from 'angular-skyhook';
import { MatchService }      from '../../../../../shared/services/match/match.service';
import { IMatch }            from '../../../../../shared/interfaces/match/match.interface';

@Component({
  selector: 'match-edit-substitutions',
  templateUrl: './match-edit-substitutions.component.html',
  styleUrls: [ './match-edit-substitutions.component.scss' ]
})
export class MatchEditSubstitutionsComponent implements OnInit {

  @Input() assignedFormation: IFormation;
  @Input() match: IMatch;

  public maxSubstitutes: number[];

  public target = this.dnd.dropTarget('PLAYERS', {
    canDrop: () => true,
    drop: monitor => {
      const $event = <IDraggedItemInterface> monitor.getItem();
      console.log('Spieler auf Ersatzbank setzen.');
      this.matchService.setPlayerToSubstitute($event.id, this.match);
    },
    hover: monitor => {
      // console.log(monitor);
    },
  });

  constructor(private dnd: SkyhookDndService,
              private matchService: MatchService) {
  }

  ngOnInit() {
    this.maxSubstitutes = new Array(this.assignedFormation.maxSubstitutes).fill(0).map((_, i) => i);
  }

}
