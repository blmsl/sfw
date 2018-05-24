import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUser } from '../interfaces/user/user.interface';
import { AuthService } from '../services/auth/auth.service';
import { take } from 'rxjs/internal/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user: IUser) =>  !!user),
      tap((user: boolean) => {
        console.log(user);
        if (!user) {
          return this.router.navigate(['/login']);
        }
      })
    );
  }

}
