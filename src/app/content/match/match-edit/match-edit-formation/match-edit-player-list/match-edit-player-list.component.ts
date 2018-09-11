import {
  Component,
  Input,
  OnDestroy,
  OnInit
}                       from '@angular/core';
import { IMember }      from '../../../../../shared/interfaces/member/member.interface';
import { MatchService } from '../../../../../shared/services/match/match.service';
import { IMatch }       from '../../../../../shared/interfaces/match/match.interface';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
}                       from '@angular/cdk/drag-drop';

@Component({
  selector: 'match-edit-player-list',
  templateUrl: './match-edit-player-list.component.html',
  styleUrls: [ './match-edit-player-list.component.scss' ]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchEditPlayerListComponent implements OnInit, OnDestroy {

  @Input() assignedTeamPlayers: IMember[];
  @Input() match: IMatch;
  @Input() connectedToDropables: string[];

  constructor(//private dnd: SkyhookDndService,
    private matchService: MatchService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    //this.target.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log('move');
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('transfer');
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  /*
   public target = this.dnd.dropTarget('PLAYERS', {
   canDrop: () => {
   console.log(123);
   return true;
   },
   drop: monitor => {
   const $event = <IDraggedItemInterface>monitor.getItem();
   console.log('Spieler aus der Aufstellung und von der Ersatzbank löschen.');
   this.matchService.removePlayerFromStartingElevenAndSubstitutes($event.id, this.match);
   }
   }); */

}
