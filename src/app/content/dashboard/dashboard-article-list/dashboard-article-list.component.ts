import { Component } from '@angular/core';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Component({
  selector: 'dashboard-article-list',
  templateUrl: './dashboard-article-list.component.html',
  styleUrls: ['./dashboard-article-list.component.scss']
})
export class DashboardArticleListComponent {

  public itemSize:number = 120;
  public maxItems:number = 4;

  public sortOrder: OrderByDirection = 'desc';
  public sortField: string = 'creationAt';
  public listType: string = 'articles';
  public viewPortHeight: string = '50vh';

  constructor() {
  }

}
