import {
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { IArticle }                        from '../../../../shared/interfaces/article.interface';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'article-dashboard-list',
  templateUrl: './article-dashboard-list.component.html',
  styleUrls: ['./article-dashboard-list.component.scss']
})
export class ArticleDashboardListComponent implements OnInit {

  @Input() articles: IArticle[];

  public config: PerfectScrollbarConfigInterface = {};

  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

  constructor() { }

  ngOnInit() {
  }

}
