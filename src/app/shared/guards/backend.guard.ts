import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Params,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { IUser } from '../interfaces/user/user.interface';

@Injectable()
export class BackendGuard implements CanActivate {

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.user$.pipe(
      take(1),
      map((user: IUser) => {
        return !!(user && (user.assignedRoles.admin || user.assignedRoles.editor))
      }),
      tap((isAllowed: boolean) => {
        if (!isAllowed) {
          this.authService.signOut().then(() => {
            console.error('Access denied - Admins and Editors only');
            const queryParams: Params = Object.assign({}, this.route.snapshot.queryParams);
            queryParams['page'] = 'forbidden';
            return this.router.navigate(['login'], { queryParams: queryParams })
          });
        }
      })
    );

  }

}
