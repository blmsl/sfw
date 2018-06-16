import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { ITeam } from '../../shared/interfaces/team/team.interface';
import { TeamService } from '../../shared/services/team/team.service';
import { Observable } from 'rxjs';
import {
  map,
  take
} from 'rxjs/operators';

@Injectable()
export class TeamResolver implements Resolve<ITeam> {

  constructor(private teamService: TeamService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITeam> {
    if (!route.params['teamId']) {
      return this.teamService.setNewTeam();
    }

    return this.teamService.getTeamById(route.params['teamId']).pipe(
      take(1),
      map((team: ITeam) => {
        if (team && team.id) {
          return team;
        } else {
          this.router.navigate(['/teams']).then();
        }
      })
    );
  }

}
