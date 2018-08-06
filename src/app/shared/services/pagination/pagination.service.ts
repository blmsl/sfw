import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
}                     from 'angularfire2/firestore';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';
import {
  map,
  scan,
  take
}                     from 'rxjs/internal/operators';
import {
  BehaviorSubject,
  Observable
}                     from 'rxjs/index';

// Options to reproduce firestore queries consistently
interface QueryConfig {
  path: string, // path to collection
  field: string, // field to orderBy
  limit?: number, // limit per query
  reverse?: boolean, // reverse order?
  prepend?: boolean // prepend to source?
}


@Injectable()
export class PaginationService {

  // Source data
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: QueryConfig;
  private cursor: any;
  private tempValues: any[] = [];

  // Observable data
  data: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();

  constructor(private afs: AngularFirestore) {
    this.loading.subscribe((isLoading) => {
      console.log('isLoading: ' + isLoading);
    });
  }


  // Initial query sets options and defines the Observable
  init(path, field, opts?) {
    this.query = {
      path,
      field,
      limit: 2,
      reverse: false,
      prepend: false,
      ...opts
    };

    const first = this.afs.collection(this.query.path, ref => {
      return ref
        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
        .limit(this.query.limit);
    });


    this.mapAndUpdate(first);

    // Create the observable array for consumption in components
    this.data = this._data.asObservable()
      .pipe(
        scan((acc, val) => {
          return this.query.prepend ? val.concat(acc) : acc.concat(val);
        })
      );
  }


  // Retrieves additional data from firestore
  more() {
    if (this.cursor !== undefined) {
      const more = this.afs.collection(this.query.path, ref => ref
        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
        .limit(this.query.limit)
        .startAfter(this.cursor)
      );
      this.mapAndUpdate(more);
    }
  }


  /* Determines the doc snapshot to paginate query
   private getCursor() {
   const current = this._data.value;

   if (current.length) {
   return this.query.prepend ? current[0].id : current[current.length - 1].id;
   }
   return null;
   } */

  // Maps the snapshot to usable format the updates source
  private mapAndUpdate(col: AngularFirestoreCollection<any>) {

    if (this._done.value || this._loading.value) {
      return;
    }

    // loading
    this._loading.next(true);

    // Map snapshot with doc ref (needed for cursor)
    return col.valueChanges().pipe(
      map(arr => {
        // If prepending, reverse array
        let values = this.query.prepend ? arr.reverse() : arr;
        // update source with new values, done loading
        this._data.next(values);
        this.tempValues = this.tempValues.concat(values);
        col.ref.get().then((snapshot) => {
          this.cursor = snapshot.docs[ this.tempValues.length - 1 ];
          this._loading.next(false);
        });


        // no more values, mark done
        if (!values.length) {
          this._done.next(true);
        }


      }),
      take(1)
    ).subscribe();

  }


  // Reset the page
  reset() {
    this._data.next([]);
    this._done.next(false);
  }

}
