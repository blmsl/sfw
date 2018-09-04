import {
  Component,
  Input
}                            from '@angular/core';
import { SkyhookDndService } from 'angular-skyhook';
import { ICoord }            from '../../../../../shared/interfaces/match/coord.interface';
import { MatchService }      from '../../../../../shared/services/match/match.service';
import { IMatch }            from '../../../../../shared/interfaces/match/match.interface';

@Component({
  selector: 'match-field-square',
  templateUrl: './match-field-square.component.html',
  styleUrls: [ './match-field-square.component.scss' ]
})
export class MatchFieldSquareComponent {

  @Input() position: ICoord;
  @Input() kp: ICoord[];
  @Input() match: IMatch;

  constructor(private dnd: SkyhookDndService,
              private matchService: MatchService) {
  }

  get isVisible() {
    return this.kp.find((coordinates: ICoord) => {
      return coordinates.x === this.position.x && coordinates.y === this.position.y;
    });
  }

  ngOnDestroy() {
    this.target.unsubscribe();
  }

  public target = this.dnd.dropTarget('PLAYERS', {
    canDrop: () => true,
    drop: monitor => {
      const $event = <IDraggedItemInterface> monitor.getItem();
      console.log('Spieler in der Startelf setzen.');
      this.matchService.setPlayerToStartingEleven($event.id, this.match, this.position);
    },
    hover: monitor => {
      // console.log(monitor);
    }
  });

}
