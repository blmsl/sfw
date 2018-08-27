import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { MatchService } from '../../../../shared/services/match/match.service';
import { IMatchEventCategory } from '../../../../shared/interfaces/match/match-event-category.interface';

@Component({
  selector: 'match-detail-content',
  templateUrl: './match-detail-content.component.html',
  styleUrls: ['./match-detail-content.component.scss']
})
export class MatchDetailContentComponent implements OnInit {

  @Input() assignedArticles: IArticle[];
  @Input() assignedCategories: ICategory[];
  @Input() match: IMatch;
  @Input() assignedPlayers: IMember[];
  @Input() assignedSubstitutes: IMember[];

  public eventCategories: IMatchEventCategory[];

  constructor(private matchService: MatchService) {
    this.eventCategories = matchService.getMatchEventCategories();
  }

  ngOnInit() {
  }

}
