import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  first,
  map,
  take,
  tap
} from 'rxjs/operators';
import { IUser } from '../interfaces/user/user.interface';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.user$.pipe(
      first(),
      map((user: IUser) => {
        if (user && !user.emailVerified) {
          this.authService.signOut().then(() => {
            return this.router.navigate(['login'], { queryParams: { message: 'Global.Login.notVerified' } });
          });
        }
        return !!user;
      }),
      tap((user: boolean) => {
        if (!user) {
          return this.router.navigate(['login']);
        }
      })
    );
  }

}
