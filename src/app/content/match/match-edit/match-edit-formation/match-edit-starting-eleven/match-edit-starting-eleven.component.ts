import { Component, Input, OnInit } from '@angular/core';
import { IFormation } from '../../../../../shared/interfaces/match/formation.interface';
import { Observable } from 'rxjs/index';
import { ICoord } from '../../../../../shared/interfaces/match/coord.interface';
import { MatchFormationService } from '../../../../../shared/services/match/match-formation.service';

@Component({
  selector: 'match-edit-starting-eleven',
  templateUrl: './match-edit-starting-eleven.component.html',
  styleUrls: ['./match-edit-starting-eleven.component.scss']
})
export class MatchEditStartingElevenComponent implements OnInit {

  @Input() assignedFormation: IFormation;

  public thirty: number[];
  public playerPositions$: Observable<ICoord[]>;

  constructor(private matchFormationService: MatchFormationService) {
  }

  ngOnInit() {
    this.thirty = new Array(30).fill(0).map((_, i) => i);
    this.playerPositions$ = this.matchFormationService.getFormationPositions(this.assignedFormation);
  }

  isVisible(pos: ICoord, kp: ICoord[]) {
    return kp.forEach((coordinates: ICoord) => {
      return coordinates.x === pos.x && coordinates.y === pos.y;
    });
  }

  getCoordinates(i): ICoord {
    return {
      x: i % 6,
      y: Math.floor(i / 6)
    }
  }

}
