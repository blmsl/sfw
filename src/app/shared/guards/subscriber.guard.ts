import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { IUser } from '../interfaces/user/user.interface';

@Injectable()
export class SubscriberGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      take(1),
      map((user: IUser) => !!(user && user.assignedRoles && user.assignedRoles.subscriber)),
      tap((isSubscriber: boolean) => {
        if (!isSubscriber) {
          console.error('Access denied - Subscribers only');
        }
      })
    );
  }

}
