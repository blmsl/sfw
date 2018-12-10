import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { Observable } from 'rxjs/index';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { ArticleService } from '../../../../shared/services/article/article.service';

@Component({
  selector: 'team-detail-events',
  templateUrl: './team-detail-events.component.html',
  styleUrls: ['./team-detail-events.component.scss']
})
export class TeamDetailEventsComponent implements OnInit {

  @Input() team: ITeam;

  public articles$: Observable<IArticle[]>;

  constructor(private articleService: ArticleService) {
    this.articles$ = articleService.articles$;
  }

  ngOnInit() {
  }

}
