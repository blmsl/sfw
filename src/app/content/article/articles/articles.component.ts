import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, scan, mergeMap, throttleTime } from 'rxjs/operators';
import { ICategory } from '../../../shared/interfaces/category.interface';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['articles.component.scss']
})

export class ArticlesComponent implements OnInit {

  public itemSize: number = 120;
  public maxItems: number = 4;

  public sortOrder: OrderByDirection = 'desc';
  public sortField: string = 'creationAt';
  public listType: string = 'articles';
  public viewPortHeight: string = '60vh';

  constructor() {
  }

  ngOnInit() {
  }

}
