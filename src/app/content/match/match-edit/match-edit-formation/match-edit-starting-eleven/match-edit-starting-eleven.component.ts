import {
  Component,
  Input,
  OnInit
}                                from '@angular/core';
import { Observable }            from 'rxjs/index';
import { ICoord }                from '../../../../../shared/interfaces/match/coord.interface';
import { MatchFormationService } from '../../../../../shared/services/match/match-formation.service';
import { IMatch }                from '../../../../../shared/interfaces/match/match.interface';
import { IFormation }            from '../../../../../shared/interfaces/match/formation.interface';
import { IMember }               from '../../../../../shared/interfaces/member/member.interface';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'match-edit-starting-eleven',
  templateUrl: './match-edit-starting-eleven.component.html',
  styleUrls: ['./match-edit-starting-eleven.component.scss']
})
export class MatchEditStartingElevenComponent implements OnInit {

  @Input() match: IMatch;
  @Input() members: IMember[];
  @Input() assignedFormation: IFormation[];
  @Input() connectedToDropables: string[];

  public thirty: number[];
  public playerPositions$: Observable<ICoord[]>;
  public coordinates = [];

  constructor(private matchFormationService: MatchFormationService) {
  }

  ngOnInit() {
    this.thirty = new Array(30).fill(0).map((_, i) => i);
    this.playerPositions$ = this.matchFormationService.getFormationPositions(this.assignedFormation[0]);
  }

  getCoordinates(i): ICoord {
    if(this.coordinates[i]){
      return this.coordinates[i];
    }
    let coords: ICoord = {
      x: i % 6,
      y: Math.floor(i / 6)
    };
    return this.coordinates[i]= coords;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log('move');
      console.log(event);
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('transfer');
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
