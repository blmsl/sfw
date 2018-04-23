import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { MemberService } from '../../../shared/services/member/member.service';
import { MemberStateService } from '../../../shared/services/member/member-state.service';
import { IMemberState } from '../../../shared/interfaces/member/member-state.interface';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import * as moment from 'moment';

import 'moment/min/locales';

moment.locale('de-de');

@Component({
  selector: 'member-statistics',
  templateUrl: './member-statistics.component.html',
  styleUrls: ['./member-statistics.component.scss']
})
export class MemberStatisticsComponent implements OnInit {

  public members$: Observable<IMember[]>;
  public memberStates: IMemberState[];
  public ahStates: IMemberState[];
  public config: PerfectScrollbarConfigInterface = {};
  public today: any;
  public currentYear: any

  constructor(private memberService: MemberService, private memberStateService: MemberStateService) {
    this.members$ = memberService.members$;
    this.memberStates = memberStateService.getMemberStates();
    this.ahStates = memberStateService.getAHStates();
    this.today = moment().format('MM-DD');
    this.currentYear = moment().format('YY');
  }

  ngOnInit() {
  }

}
