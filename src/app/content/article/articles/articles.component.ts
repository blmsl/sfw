import { Component, OnInit } from '@angular/core';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['articles.component.scss']
})

export class ArticlesComponent implements OnInit {

  public itemSize = 120;
  public maxItems = 4;

  public sortOrder: OrderByDirection = 'desc';
  public sortField = 'creationAt';
  public listType = 'articles';
  public viewPortHeight = '60vh';

  constructor() {
  }

  ngOnInit() {
  }

}
