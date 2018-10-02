import {
  ChangeDetectionStrategy,
  Component,
  Input
}                            from '@angular/core';
import { ICoord }            from '../../../../../shared/interfaces/match/coord.interface';
import { MatchService }      from '../../../../../shared/services/match/match.service';
import { IMatch }            from '../../../../../shared/interfaces/match/match.interface';
import { AlertService }      from '../../../../../shared/services/alert/alert.service';
import { IStartingPosition } from '../../../../../shared/interfaces/match/starting-position.interface';
import { IMember }           from '../../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'match-field-square',
  templateUrl: './match-field-square.component.html',
  styleUrls: [ './match-field-square.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchFieldSquareComponent {

  @Input() position: ICoord;
  @Input() kp: ICoord[];
  @Input() match: IMatch;
  @Input() members: IMember[];

  constructor(private alertService: AlertService,
              private matchService: MatchService) {
  }

  get isVisible() {
    return this.kp.find((coordinates: ICoord) => {
      return coordinates.x === this.position.x && coordinates.y === this.position.y;
    });
  }

  get selectedPlayer() {
    const startingPosition = this.match.startingEleven.find((startingPosition: IStartingPosition) => {
      return startingPosition.position.x === this.position.x && startingPosition.position.y === this.position.y;
    });
    if (!startingPosition) {
      return false;
    }

    return this.members.find((member: IMember) => {
      return member.id === startingPosition.memberId;
    });
  }

  ngOnDestroy() {
    // this.target.unsubscribe();
  }

  /* public target = this.dnd.dropTarget('PLAYERS', {
   canDrop: () => true,
   drop: monitor => {
   const $event = <IDraggedItemInterface>monitor.getItem();
   this.matchService.setPlayerToStartingEleven($event.id, this.match, this.position).then(
   () => this.alertService.showSnackBar('success', 'member.formation.startingEleven.added'),
   (error: any) => this.alertService.showSnackBar('error', error.message)
   );
   }
   });

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
   opacity = 0.5;
   }
   else if (canDrop && !isOver) {
   opacity = 0.5;
   }
   else if (!canDrop && isOver) {
   border = '3px dashed blue';
   opacity = 0.5;
   }
   return {
   backgroundColor: backgroundColor,
   border: border,
   opacity: opacity
   };
   }));
   */
}
