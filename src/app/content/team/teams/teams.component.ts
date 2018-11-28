import { Component, OnInit } from '@angular/core';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  styleUrls: ['teams.component.scss']
})

export class TeamsComponent implements OnInit {

  public itemSize = 120;
  public maxItems = 4;

  public sortOrder: OrderByDirection = 'desc';
  public sortField = 'title';
  public listType = 'teams';
  public viewPortHeight = '60vh';

  constructor() {
  }

  ngOnInit() {
  }

}
