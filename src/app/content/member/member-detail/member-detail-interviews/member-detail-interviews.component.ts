import { Component, Input, OnInit } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { ArticleService } from '../../../../shared/services/article/article.service';
import { Observable } from 'rxjs';
import { IArticle } from '../../../../shared/interfaces/article.interface';

@Component({
  selector: 'member-detail-interviews',
  templateUrl: './member-detail-interviews.component.html',
  styleUrls: ['./member-detail-interviews.component.scss']
})
export class MemberDetailInterviewsComponent implements OnInit {

  @Input() member: IMember;
  public articles$: Observable<IArticle[]>;

  constructor(private articleService: ArticleService) {
    this.articles$ = articleService.articles$;
  }

  ngOnInit() {
  }

}
