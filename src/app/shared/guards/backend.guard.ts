import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import {
  map,
  tap
} from 'rxjs/operators';
import { IUser } from '../interfaces/user/user.interface';
import { AlertService } from '../services/alert/alert.service';
import { first, take } from 'rxjs/internal/operators';

@Injectable()
export class BackendGuard implements CanActivate {

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user: IUser) => {
        return user && (user.assignedRoles.admin || user.assignedRoles.editor);
      }),
      tap((isAllowed: boolean) => {
        if (!isAllowed) {
          console.log(isAllowed);
          this.authService.signOut().then(() => {
            this.alertService.showSnackBar('error', 'general.forbidden.text', 15000);
            return this.router.navigate(['login']);
          });
        }
      })
    );
  }

}
