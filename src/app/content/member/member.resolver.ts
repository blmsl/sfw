import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { MemberService } from '../../shared/services/member/member.service';
import { Observable } from 'rxjs';
import { IMember } from '../../shared/interfaces/member/member.interface';
import {
  map,
  take
} from 'rxjs/operators';

@Injectable()
export class MemberResolver implements Resolve<IMember> {

  constructor(private memberService: MemberService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMember> {

    if (!route.params['memberId']) {
      return this.memberService.setNewMember();
    }
    return this.memberService.getMemberById(route.params['memberId']).pipe(
      take(1),
      map((member: IMember) => {
        if (member && member.id) {
          return member;
        } else {
          this.router.navigate(['/members']).then();
        }
      })
    );
  }
}
