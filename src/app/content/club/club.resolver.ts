import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IClub } from '../../shared/interfaces/club/club.interface';
import { ClubService } from '../../shared/services/club/club.service';
import {
  map,
  take
} from 'rxjs/operators';

@Injectable()
export class ClubResolver implements Resolve<IClub> {

  constructor(private clubService: ClubService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClub> {

    if (route.params['clubId'] === 'new') {
      return this.clubService.setNewClub();
    }

    return this.clubService.getClubById(route.params['clubId']).pipe(
      take(1),
      map((club: IClub) => {
        if (club && club.id) {
          return club;
        } else {
          this.router.navigate(['/clubs']).then();
        }
      })
    );
  }

}
