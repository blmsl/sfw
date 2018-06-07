import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import {
  map,
  take,
  tap
} from 'rxjs/operators';

@Injectable()
export class CanReadGuard implements CanActivate {

  constructor(private auth: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$.pipe(
      take(1),
      map(user => ((!user && this.auth.canEdit(user)))),
      tap((canEdit: boolean) => {
        if (!canEdit) {
          console.error('Access denied. Must have permission to EDIT content');
        }
      })
    );
  }
}
