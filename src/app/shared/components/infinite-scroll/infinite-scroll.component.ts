import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, mergeMap, scan, tap, throttleTime } from 'rxjs/operators';
import * as moment from 'moment';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Component({
  selector: 'infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent {

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  @Input() sortOrder: OrderByDirection;
  @Input() sortField: string;

  @Input() itemSize: number;
  @Input() maxItems: number;
  @Input() listType: string;
  @Input() viewPortHeight: string;

  @Output() removeItem: EventEmitter<string> = new EventEmitter<string>(false);

  public theEnd = false;

  public offset = new BehaviorSubject(null);
  public infinite$: Observable<any[]>;
  public moment: any;

  constructor(private db: AngularFirestore) {
    this.moment = moment;
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getBatch(n)),
      scan((acc, batch) => {
        return {
          ...acc,
          ...batch
        };
      }, {})
    );

    this.infinite$ = batchMap.pipe(map(v => Object.values(v)));
  }

  getBatch(offset) {
    console.log(offset);
    console.log(this.sortField, this.sortOrder);
    return this.db
      .collection(this.listType, ref =>
        offset
          ? ref.orderBy(this.sortField, this.sortOrder).startAfter(offset).limit(this.maxItems)
          : ref.orderBy(this.sortField, this.sortOrder).limit(this.maxItems)
      )
      .snapshotChanges()
      .pipe(
        tap(arr => (arr.length ? null : (this.theEnd = true))),
        map(arr => {
          return arr.reduce((acc, cur) => {
            const id = cur.payload.doc.id;
            const data = cur.payload.doc.data();
            return {
              ...acc,
              [id]: data
            };
          }, {});
        })
      );
  }

  nextBatch(e, offset) {
    if (this.theEnd) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (end === total) {
      this.offset.next(offset);
    }
  }

  trackByIdx(i) {
    return i;
  }

}
