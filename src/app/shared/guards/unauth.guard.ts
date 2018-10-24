import { Injectable }  from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
}                      from '@angular/router';
import { Observable }  from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import {
  first,
  map,
  tap
}                from 'rxjs/operators';
import { IUser } from '../interfaces/user/user.interface';

@Injectable()
export class UnAuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      first(),
      map((user: IUser) => {
        console.log(user);
        return !user;
      }),
      tap((isLoggedOut: boolean) => {
        if (!isLoggedOut) {
          return this.router.navigate([ 'dashboard' ]);
        }
      })
    );
  }
}
