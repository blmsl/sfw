import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { ICoord } from '../../interfaces/match/coord.interface';
import { IFormation } from '../../interfaces/match/formation.interface';

@Injectable()
export class MatchFormationService {

  playerPositions$: BehaviorSubject<ICoord[]> = new BehaviorSubject<ICoord[]>([]);

  constructor() {
  }

  getFormationPositions(formation: IFormation): Observable<ICoord[]>{
    for(let i = 0; i < formation.positionList.length; i++){
      this.playerPositions$.next(this.playerPositions$.getValue().concat(formation.positionList[i]));
    }
    return this.playerPositions$;
  }

}
