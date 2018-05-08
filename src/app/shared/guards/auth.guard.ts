import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';



import {
  map,
  take,
  tap
} from 'rxjs/operators';
import { IUser } from '../interfaces/user/user.interface';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user: IUser) => !!user),
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          return this.router.navigate(['/login']);
        }
      })
    );
  }

}
