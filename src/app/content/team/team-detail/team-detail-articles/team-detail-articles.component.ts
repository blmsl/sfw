import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IArticle } from '../../../../shared/interfaces/article.interface';

@Component({
  selector: 'team-detail-articles',
  templateUrl: './team-detail-articles.component.html',
  styleUrls: ['./team-detail-articles.component.scss']
})
export class TeamDetailArticlesComponent implements OnInit {

  @Input() assignedArticles: IArticle[];

  constructor() { }

  ngOnInit() {
  }

}
