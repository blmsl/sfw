import { Component, OnInit } from '@angular/core';
import { MemberOfTheWeekService } from '../../../shared/services/member/member-of-the-week.service';
import { Observable } from 'rxjs';
import { IMemberOfTheWeek } from '../../../shared/interfaces/member/member-of-the-week.interface';

@Component({
  selector: 'fame-member',
  templateUrl: './fame-member.component.html',
  styleUrls: ['./fame-member.component.scss']
})
export class FameMemberComponent implements OnInit {

  public membersOfTheWeeks$: Observable<IMemberOfTheWeek[]>;

  constructor(private memberOfTheWeekService: MemberOfTheWeekService) {
    this.membersOfTheWeeks$ = memberOfTheWeekService.membersOfTheWeek$;
  }

  ngOnInit() {
  }

}
