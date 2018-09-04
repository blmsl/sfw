import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IFormation } from '../../../../../shared/interfaces/match/formation.interface';
import { SkyhookDndService } from 'angular-skyhook';
import { MatchService } from '../../../../../shared/services/match/match.service';
import { IMatch } from '../../../../../shared/interfaces/match/match.interface';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'match-edit-substitutions',
  templateUrl: './match-edit-substitutions.component.html',
  styleUrls: ['./match-edit-substitutions.component.scss']
})
export class MatchEditSubstitutionsComponent implements OnInit {

  @Input() assignedFormation: IFormation;
  @Input() match: IMatch;

  public maxSubstitutes: number[];

  public target = this.dnd.dropTarget('PLAYERS', {
    canDrop: monitor => {
      return true;
    },
    drop: monitor => {
      const $event = <IDraggedItemInterface>monitor.getItem();
      console.log('Spieler auf Ersatzbank setzen.');
      this.matchService.setPlayerToSubstitute($event.id, this.match);
    }
  });

  constructor(private dnd: SkyhookDndService,
    private matchService: MatchService) {
  }

  ngOnInit() {
    this.maxSubstitutes = new Array(this.assignedFormation.maxSubstitutes).fill(0).map((_, i) => i);
  }

  collected$ = this.target.listen(m => ({
    canDrop: m.canDrop(),
    isOver: m.isOver()
  }));

  overlayStyle$ = this.collected$.pipe(map(coll => {
    let { canDrop, isOver } = coll;
    let border: string = '0';
    let opacity: number = 1;
    let backgroundColor: string = '';

    if (canDrop && isOver) {
      border = '3px dashed green';
      backgroundColor = 'lawngreen';
      opacity = 0.5
    }
    else if (canDrop && !isOver) {
      opacity = 0.5
    }
    else if (!canDrop && isOver) {
      border = '3px dashed blue';
      opacity = 0.5
    }
    return {
      backgroundColor: backgroundColor,
      border: border,
      opacity: opacity
    }
  }));

}
