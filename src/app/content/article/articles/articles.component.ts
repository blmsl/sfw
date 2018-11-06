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

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['articles.component.scss']
})

export class ArticlesComponent implements OnInit {
  public categories$: Observable<ICategory[]>;

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  public batch = 20;
  public theEnd = false;

  public offset = new BehaviorSubject(null);
  public infinite: Observable<any[]>;
  public itemSize: number = 400;

  public order: string = 'title';

  constructor(private db: AngularFirestore) {
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getBatch(n)),
      scan((acc, batch) => {
        return { ...acc, ...batch };
      }, {})
    );

    this.infinite = batchMap.pipe(map(v => Object.values(v)));
  }

  getBatch(offset) {
    return this.db
      .collection('articles', ref =>
        ref
          .orderBy(this.order)
          .startAfter(offset)
          .limit(this.batch)
      )
      .snapshotChanges()
      .pipe(
        tap(arr => (arr.length ? null : (this.theEnd = true))),
        map(arr => {
          return arr.reduce((acc, cur) => {
            const id = cur.payload.doc.id;
            const data = cur.payload.doc.data();
            return { ...acc, [id]: data };
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
    console.log(`${end}, '>=', ${total}`);
    if (end === total) {
      this.offset.next(offset);
    }
  }

  trackByIdx(i) {
    return i;
  }

  ngOnInit() {
  }

  /*removeArticle($event) {
    this.articleService.removeArticle($event).then(
      () => this.alertService.showSnackBar('success', 'general.articles.edit.deleteSuccess'),
      (error: any) => this.alertService.showSnackBar('error', error.message));
  }

  updateArticle($event) {
    this.articleService.updateArticle($event.article.id, $event.article).then(
      () => this.alertService.showSnackBar('success', 'general.articles.edit.updateSuccess'),
      (error: any) => this.alertService.showSnackBar('error', error.message));
  }*/
}
