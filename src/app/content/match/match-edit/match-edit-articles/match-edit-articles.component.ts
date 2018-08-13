import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import { IArticle } from '../../../../shared/interfaces/article.interface';

@Component({
  selector: 'match-edit-articles',
  templateUrl: './match-edit-articles.component.html',
  styleUrls: ['./match-edit-articles.component.scss']
})
export class MatchEditArticlesComponent implements OnInit {

  @Input() match: IMatch;
  @Input() articles: IArticle;

  constructor() { }

  ngOnInit() {
  }

}
