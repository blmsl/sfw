
import { take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';



@Injectable()
export class PaginationService {

  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: IQueryConfig;

  data: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();

  constructor(private firestore: AngularFirestore) {
  }

  init(path: string, field: string, opts?: any) {
    this.query = {
      path,
      field,
      limit: 10,
      reverse: false,
      prepend: false,
      ...opts
    };

    const first = this.firestore.collection(this.query.path, (ref) => {
      return ref
        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
        .limit(this.query.limit);
    });

    this.mapAndUpdate(first);

    console.log('ToDo');
    /* this.data = this._data.asObservable()
      .scan((acc, val) => {
        return this.query.prepend ? val.concat(acc) : acc.concat(val)
      });*/
  }

  more() {
    const cursor = this.getCursor();

    const more = this.firestore.collection(this.query.path, ref => {
      return ref
        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
        .limit(this.query.limit)
        .startAfter(cursor);
    });
    this.mapAndUpdate(more);
  }

  private getCursor() {
    const current = this._data.value;
    if (current.length) {
      return this.query.prepend ? current[0].doc : current[current.length - 1].doc;
    }
    return null;
  }

  private mapAndUpdate(col: AngularFirestoreCollection<any>) {
    if (this._done.value || this._loading.value) {
      return;
    }

    this._loading.next(true);

    return col.snapshotChanges().pipe(
      tap((arr: any[]) => {

        let values = arr.map((snapshot) => {
          const data = snapshot.payload.doc.data();
          const doc = snapshot.payload.doc;
          return { ...data, doc };
        });

        values = this.query.prepend ? values.reverse() : values;

        this._data.next(values);
        this._loading.next(false);

        if (!values.length) {
          this._done.next(true);
        }
      }),
      take(1), )
      .subscribe();
  }

}
