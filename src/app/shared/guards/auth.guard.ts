import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUser } from '../interfaces/user/user.interface';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      // take(1),
      map((user: IUser) => {
        console.log(user);
        if (user && !user.emailVerified) {
          this.authService.signOut().then(() => {
            return this.router.navigate(['login'], { queryParams: { message: 'Global.Login.notVerified' } });
          });
        }
        console.log(!!user);
        return !!user;
      }),
      tap((user: boolean) => {
        console.log(user);
        if (!user) {
          return this.router.navigate(['login']);
        }
      })
    );
  }

}
