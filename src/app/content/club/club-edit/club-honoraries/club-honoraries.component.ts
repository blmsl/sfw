import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { MatOptionSelectionChange } from '@angular/material';
import { MemberService } from '../../../../shared/services/member/member.service';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'club-honoraries',
  templateUrl: './club-honoraries.component.html'
})
export class ClubHonorariesComponent implements OnInit {

  @Input() club: IClub;
  @Input() articles: IArticle;
  @Input() honoraries$: Observable<IMember[]>;

  constructor(private memberService: MemberService,
    private alertService: AlertService) {
    this.honoraries$ = this.memberService.getHonoraryList();
  }

  ngOnInit() {
  }

  setHonoraryArticle($event: MatOptionSelectionChange, member: IMember) {
    member.honoraryArticle = $event.source.value;

    /* this.memberService.updateMember(member).then(
      () => this.alertService.showSnackBar('success', 'general.applications.updateMessage'),
      (error: any) => this.alertService.showSnackBar('error', error.message)
    ).catch((error: any) => {
      this.alertService.showSnackBar('error', error.message);
    }); */
  }


}
