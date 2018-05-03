import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { MatchService } from '../../shared/services/match/match.service';
import { IMatch } from '../../shared/interfaces/match.interface';
import { Observable } from 'rxjs';
import {
  map,
  take
} from 'rxjs/operators';

@Injectable()
export class MatchResolver implements Resolve<IMatch> {

  constructor(private matchService: MatchService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMatch> {
    if (route.params['matchId'] === 'new') {
      return this.matchService.setNewMatch();
    }
    return this.matchService.getMatchById(route.params['matchId']).pipe(
      take(1),
      map((match: IMatch) => {
        if (match && match.id) {
          return match;
        } else {
          this.router.navigate(['/matches']).then();
        }
      })
    );
  }
}
