import { Component } from '@angular/core';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { Observable } from 'rxjs';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'members',
  templateUrl: './members.component.html'
})
export class MembersComponent {

  public members$: Observable<IMember[]>;

  constructor(private memberService: MemberService,
    private alertService: AlertService) {
    this.members$ = memberService.members$;
  }

  removeMember($event: IMember) {
    this.memberService.removeMember($event).then(
      () => this.alertService.showSnackBar('success', 'general.members.list.deleted'),
      (error: any) => this.alertService.showSnackBar('error', error.message)
    );
  }

}
