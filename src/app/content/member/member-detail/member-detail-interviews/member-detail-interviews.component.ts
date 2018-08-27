import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { IArticle } from '../../../../shared/interfaces/article.interface';

@Component({
  selector: 'member-detail-interviews',
  templateUrl: './member-detail-interviews.component.html',
  styleUrls: ['./member-detail-interviews.component.scss']
})
export class MemberDetailInterviewsComponent implements OnInit {

  @Input() member: IMember;
  @Input() assignedArticles: IArticle[];

  constructor() {
  }

  ngOnInit() {
  }

}
