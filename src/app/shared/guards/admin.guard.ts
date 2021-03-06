import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
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
import { AlertService } from '../services/alert/alert.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
    private alertService: AlertService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user: IUser) => {
        return !!(user && user.assignedRoles.admin);
      }),
      tap((isAdmin: boolean) => {
        if (!isAdmin) {
          return this.router.navigate(['/dashboard']).then(
            () => this.alertService.showSnackBar('error', 'general.forbidden.text', 3000)
          );
        }
      })
    );
  }

}
