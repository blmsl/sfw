import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { IUser } from '../../interfaces/user.interface';

@Injectable()
export class EditorGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user: IUser) => {
        console.log(user);
        return user && user.assignedRoles && user.assignedRoles.editor ? true : false;
      }),
      tap(isEditor => {
        if (!isEditor) {
          console.error('Access denied - Editors only');
        }
      })
    );
  }

}
