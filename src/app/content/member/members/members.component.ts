import { Component } from '@angular/core';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'members',
  templateUrl: './members.component.html'
})
export class MembersComponent {

  public members$: Observable<IMember[]>;

  constructor(public memberService: MemberService) {
    this.members$ = memberService.members$;
  }

}
