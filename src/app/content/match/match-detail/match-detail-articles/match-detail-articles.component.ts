import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from '../../../../shared/interfaces/article.interface';

@Component({
  selector: 'match-detail-articles',
  templateUrl: './match-detail-articles.component.html',
  styleUrls: ['./match-detail-articles.component.scss']
})
export class MatchDetailArticlesComponent implements OnInit {

  @Input() assignedArticles: IArticle[];

  constructor() { }

  ngOnInit() {
  }

}
