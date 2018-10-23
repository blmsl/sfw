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

import { IUser } from '../../../shared/interfaces/user/user.interface';

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['articles.component.scss']
})

export class ArticlesComponent implements OnInit {

  // public articles$: Observable<IArticle[]>;
  public categories$: Observable<ICategory[]>;
  public users$: Observable<IUser[]>;

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

  /* public form: FormGroup;
  public filters: {
    author?: string,
    sorting?: string,
    status?: number,
    tags?: string[]
  };

  constructor(private articleService: ArticleService,
    private userService: UserService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private categoryService: CategoryService) {
    // this.articles$ = articleService.articles$;
    this.users$ = this.userService.users$;
    this.categories$ = categoryService.categories$;
  }

  trackByIdx(i) {
    return i;
  }*/

  ngOnInit() {
    /* this.form = this.fb.group({
      assignedTags: undefined,
      creation: this.fb.group({
        'by': undefined,
      }),
      publication: this.fb.group({
        status: undefined
      }),
      sorting: 'desc'
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: {
      author: string,
      sorting: string,
      status: number,
      tags: string[]
    }) => {
      this.filters = changes;
    }); */
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
