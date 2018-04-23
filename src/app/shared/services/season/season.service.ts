import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISeason } from '../../interfaces/season.interface';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Injectable()
export class SeasonService {

  private collectionRef: AngularFirestoreCollection<ISeason>;
  private path = `seasons`;

  seasons$: Observable<ISeason[]>;

  constructor(private afs: AngularFirestore) {
    this.collectionRef = this.afs.collection<ISeason>(this.path);
    this.seasons$ = this.collectionRef.valueChanges();
  }

  createSeason(season: ISeason): Promise<void> {
    season.id = this.afs.createId();
    return this.afs.collection(this.path).doc(season.id).set(season);
  }

  removeSeason(season: ISeason): Promise<void> {
    return this.afs.collection(this.path).doc(season.id).delete();
  }

  updateSeason(seasonId: string, season: ISeason): Promise<any> {
    return this.afs.collection(this.path).doc(seasonId).update(season);
  }

  getSeasonById(seasonId: string): Observable<ISeason> {
    return this.afs.doc<ISeason>(this.path + '/' + seasonId).valueChanges();
  }

  setNewSeason(): ISeason {
    return {
      title: '',
    };
  }
}
