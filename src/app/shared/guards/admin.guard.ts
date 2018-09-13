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
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.user$.pipe(
      take(1),
      map((user: IUser) => !!(user && user.assignedRoles.admin)),
      tap((isAdmin: boolean) => {
        console.log(isAdmin);
        if (!isAdmin) {
          console.error('Access denied - Admins only');
          return this.router.navigate(['/forbidden']);
        }
      })
    );

  }

}
