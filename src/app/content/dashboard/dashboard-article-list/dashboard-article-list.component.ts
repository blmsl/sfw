import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-article-list',
  templateUrl: './dashboard-article-list.component.html',
  styleUrls: ['./dashboard-article-list.component.scss']
})
export class DashboardArticleListComponent {

  public itemSize = 80;
  public sortOrder = 'title';
  public maxItems = 2;

  constructor() {
  }

}
