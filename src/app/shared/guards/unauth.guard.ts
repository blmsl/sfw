import { Injectable }  from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
}                      from '@angular/router';
import { Observable }  from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {
  map,
  take,
  tap
}                      from 'rxjs/operators';
import { IUser }       from '../interfaces/user/user.interface';

@Injectable()
export class UnAuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user: IUser) => !user),
      tap((isLoggedOut: boolean) => {
        if (!isLoggedOut) {
          this.router.navigate([ '/' ]).then();
        }
      })
    );
  }
}
