import { Injectable }  from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
}                      from '@angular/router';
import { Observable }  from 'rxjs';
import { IUser }       from '../../shared/interfaces/user/user.interface';
import { UserService } from '../../shared/services/user/user.service';
import {
  map,
  take
}                      from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<IUser> {

  constructor(private userService: UserService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> {

    return this.userService.getUserById(route.params[ 'userId' ]).pipe(
      take(1),
      map((user: IUser) => {
        if (user && user.id) {
          console.log(user);
          return user;
        } else {
          this.router.navigate([ '/users' ]).then();
        }
      })
    );
  }

}
