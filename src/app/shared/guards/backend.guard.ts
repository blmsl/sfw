import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { IUser } from '../interfaces/user/user.interface';

@Injectable()
export class BackendGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.user$.pipe(
      take(1),
      map((user: IUser) => !!(user && (user.assignedRoles.admin || user.assignedRoles.editor))),
        tap((isAllowed: boolean) => {
          if (!isAllowed) {
            console.error('Access denied - Admins and Editors only');
            this.router.navigate(['forbidden']).then(() => console.log(123));
          }
        })
      );

  }

}
