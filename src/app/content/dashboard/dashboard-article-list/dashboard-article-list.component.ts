import { Component } from '@angular/core';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Component({
  selector: 'dashboard-article-list',
  templateUrl: './dashboard-article-list.component.html',
  styleUrls: ['./dashboard-article-list.component.scss']
})
export class DashboardArticleListComponent {

  public itemSize = 120;
  public maxItems = 4;

  public sortOrder: OrderByDirection = 'desc';
  public sortField = 'creationAt';
  public listType = 'articles';
  public viewPortHeight = '50vh';

  constructor() {
  }

}
