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
import { AlertService } from '../services/alert/alert.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService,
              private alertService: AlertService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.user$.pipe(
      first(),
      map((user: IUser) => {
        if (user && !user.emailVerified) {
          this.alertService.showSnackBar('error', 'Global.Login.notVerified');
          return this.authService.signOut();
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
