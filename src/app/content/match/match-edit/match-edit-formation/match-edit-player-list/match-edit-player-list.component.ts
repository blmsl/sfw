import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';
import { SkyhookDndService } from 'angular-skyhook';
import { MatchService } from '../../../../../shared/services/match/match.service';
import { IMatch } from '../../../../../shared/interfaces/match/match.interface';

@Component({
  selector: 'match-edit-player-list',
  templateUrl: './match-edit-player-list.component.html',
  styleUrls: ['./match-edit-player-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchEditPlayerListComponent implements OnInit, OnDestroy {

  @Input() assignedTeamPlayers: IMember[];
  @Input() match: IMatch;

  constructor(private dnd: SkyhookDndService,
    private matchService: MatchService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.target.unsubscribe();
  }

  public target = this.dnd.dropTarget('PLAYERS', {
    canDrop: () => true,
    drop: monitor => {
      const $event = <IDraggedItemInterface>monitor.getItem();
      console.log('Spieler aus der Aufstellung und von der Ersatzbank löschen.');
      this.matchService.removePlayerFromStartingElevenAndSubstitutes($event.id, this.match);
    },
    hover: () => {
      // console.log(monitor);
    }
  });

  /*
   collected$ = this.target.listen(m => ({
   canDrop: m.canDrop(),
   isOver: m.isOver()
   }));

   showOverlay$ = this.collected$.pipe(map(c => c.isOver || c.canDrop));

   overlayStyle$ = this.collected$.pipe(map(coll => {
   let { canDrop, isOver } = coll;
   let bg: string = 'rgba(0,0,0,0)';
   if (canDrop && isOver) {
   bg = 'green';
   }
   else if (canDrop && !isOver) {
   bg = 'yellow';
   }
   else if (!canDrop && isOver) {
   bg = 'red';
   }
   return {
   position: 'absolute',
   top: 0,
   left: 0,
   height: '100%',
   width: '100%',
   zIndex: 1,
   opacity: 0.5,
   backgroundColor: bg
   };
   })); */

}
