import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IArticle }          from '../../../../shared/interfaces/article.interface';

@Component({
  selector: 'article-dashboard-list',
  templateUrl: './article-dashboard-list.component.html',
  styleUrls: ['./article-dashboard-list.component.scss']
})
export class ArticleDashboardListComponent implements OnInit {

  @Input() articles: IArticle[];

  constructor() { }

  ngOnInit() {
  }

}
