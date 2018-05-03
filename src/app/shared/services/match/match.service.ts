import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { IMatch } from '../../interfaces/match.interface';
import { of } from 'rxjs/index';

@Injectable()
export class MatchService {

  private collectionRef: AngularFirestoreCollection<IMatch>;
  private path = `match-fixtures`;

  matches$: Observable<IMatch[]>;

  constructor(private afs: AngularFirestore, ) {
    this.collectionRef = this.afs.collection<IMatch>(this.path);
    this.matches$ = this.collectionRef.valueChanges();
  }

  createMatch(match: IMatch): Promise<void> {
    match.id = this.afs.createId();
    return this.afs.collection(this.path).doc(match.id).set(match);
  }

  removeMatch(match: IMatch): Promise<void> {
    return this.afs.collection(this.path).doc(match.id).delete();
  }

  updateMatch(matchId: string, data: any): Promise<any> {
    return this.afs.collection(this.path).doc(matchId).update(data);
  }

  getOtherEventList(): { id: number, title: string }[] {
    return [
      { id: 0, title: 'ohne Ergebnis' },
      { id: 1, title: 'ohne Wertung' },
      { id: 2, title: 'Abbruch' },
      { id: 3, title: 'Ausfall' },
      { id: 4, title: 'Absetzung' },
      { id: 5, title: 'Annulierung' },
      { id: 6, title: 'Sportgerichtsurteil' },
      { id: 7, title: 'Verwaltungsentscheid' },
      { id: 8, title: 'Nichtantritt Beide' },
      { id: 9, title: 'Nichtantritt Gast' },
      { id: 10, title: 'Nichtantritt Heim' },
      { id: 11, title: 'nach Elfmeterschießen' },
      { id: 12, title: 'nach Verlängerung' },
      { id: 13, title: 'keine Angabe' }
    ];
  }

  getMatchById(matchId: string): Observable<IMatch> {
    return this.afs.doc<IMatch>(this.path + '/' + matchId).valueChanges();
  }

  setNewMatch(): Observable<IMatch> {
    return of({
      homeTeam: {
        externalTeamLink: '',
        logoURL: '',
        title: ''
      },
      guestTeam: {
        externalTeamLink: '',
        logoURL: '',
        title: ''
      },
      isImported: true,
      isHomeTeam: true,
      isOfficialMatch: true,
      assignedTeamCategory: '',
      startDate: new Date(),
      endDate: null,
      matchLink: '',
      matchType: ''
    });
  }
}
