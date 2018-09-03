import { Component, Input, OnInit } from '@angular/core';
import { SkyhookDndService } from 'angular-skyhook';
import { MatchFormationService } from '../../../../../shared/services/match/match-formation.service';
import { map } from 'rxjs/internal/operators';
import { ICoord } from '../../../../../shared/interfaces/match/coord.interface';

@Component({
  selector: 'match-field-square',
  templateUrl: './match-field-square.component.html',
  styleUrls: ['./match-field-square.component.scss']
})
export class MatchFieldSquareComponent {

  @Input() position: ICoord;
  @Input() kp: ICoord[];

  get isVisible() {
    return this.kp.find((coordinates: ICoord) => {
      return coordinates.x === this.position.x && coordinates.y === this.position.y;
    });
  }

  /* get isVisible() {
    console.log(this.kp);
    const { x, y } = this.position;
    return (x + y) % 2 === 1;
  } */

  // This is the core of the dragging logic!
  target = this.dnd.dropTarget('player', {
    canDrop: monitor => {
      return true; // this.game.canMoveKnight(this.position);
    },
    drop: monitor => {
      // this.game.moveKnight(this.position);
      return true;
    }
  });

  collected$ = this.target.listen(m => ({
    canDrop: m.canDrop(),
    isOver: m.isOver(),
  }));

  showOverlay$ = this.collected$.pipe(map(c => c.isOver || c.canDrop));

  overlayStyle$ = this.collected$.pipe(map(coll => {
    let { canDrop, isOver } = coll;
    let bg: string = "rgba(0,0,0,0)";
    if (canDrop && isOver) { bg = 'green'; }
    else if (canDrop && !isOver) { bg = 'yellow'; }
    else if (!canDrop && isOver) { bg = 'red'; }
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      zIndex: 1,
      opacity: 0.5,
      backgroundColor: bg
    }
  }));

  constructor(private dnd: SkyhookDndService, private game: MatchFormationService) { }

  ngOnDestroy() {
    this.target.unsubscribe();
  }

}
