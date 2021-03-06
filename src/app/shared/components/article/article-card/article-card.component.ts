import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArticle } from '../../../interfaces/article.interface';

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article: IArticle;
  @Input() showDeleteButton = false;
  @Input() showPublication = false;
  @Input() showText = true;

  @Input() itemSize: number;

  @Output() deleteArticleToMatchAssignment: EventEmitter<IArticle> = new EventEmitter<IArticle>(false);

  constructor() { }

  ngOnInit() {
  }

}
