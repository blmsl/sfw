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
export class EditorGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.user$.pipe(
      take(1),
      map((user: IUser) => !!(user && user.assignedRoles.editor)),
      tap((isAdmin: boolean) => {
        if (!isAdmin) {
          console.error('Access denied - Editors only');
          return this.router.navigate(['/forbidden']);
        }
      })
    );

  }

}
