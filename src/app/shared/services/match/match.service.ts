import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
}                     from 'angularfire2/firestore';
import { IMatch }     from '../../interfaces/match/match.interface';
import { of }         from 'rxjs/index';
import { IFormation } from '../../interfaces/match/formation.interface';
import * as firebase  from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

@Injectable()
export class MatchService {

  private collectionRef: AngularFirestoreCollection<IMatch>;
  private path = `matches`;

  private formations: IFormation[] = [
    {
      'title': '4-4-2 (2)',
      'mainFormation': 11,
      'maxSubstitutes': 7,
      'positionList':
        [
          'keeper centered',
          'defense left', 'defense left-centered', 'defense right-centered', 'defense right',
          'mdf left', 'mdf  left-centered', 'mdf right-centered', 'mdf right',
          'offense left-centered', 'offense  right-centered'
        ]
    },
    {
      'title': '4-4-2 (1)',
      'mainFormation': 11,
      'maxSubstitutes': 7,
      'positionList':
        [
          'keeper centered',
          'defense left', 'defense left-centered', 'defense right-centered', 'defense right',
          'd-mdf left-centered', 'd-mdf right-centered',
          'mdf left', 'mdf right',
          'offense left-centered', 'offense right-centered'
        ]
    },
    {
      'title': '4-2-4',
      'mainFormation': 11,
      'maxPlayers': 18,
      'positionList':
        [
          'keeper centered',
          'defense left', 'defense left-centered', 'defense right-centered', 'defense right',
          'mdf left-centered', 'mdf right-centered',
          'offense left', 'offense left-centered', 'offense  right-centered', 'offense right'
        ]
    },
    {
      'title': '3-4-3',
      'mainFormation': 11,
      'maxPlayers': 18,
      'positionList':
        [
          'keeper centered',
          'defense left', 'defense centered', 'defense right',
          'mdf right', 'mdf left-centered', 'mdf right-centered', 'mdf right',
          'offense left', 'offense centered', 'offense right'
        ]
    },
    { 'title': '4-3-3', 'mainFormation': 11,
      'maxPlayers': 18, 'positionList': [''] },
    { 'title': '5-3-2', 'mainFormation': 11,
      'maxPlayers': 18, 'positionList': [''] },
    { 'title': '3-5-2', 'mainFormation': 11,
      'maxPlayers': 18, 'positionList': [''] },
    { 'title': '5-4-1', 'mainFormation': 11,
      'maxPlayers': 18, 'positionList': [''] },
    { 'title': '4-5-1', 'mainFormation': 11,
      'maxPlayers': 18, 'positionList': [''] },
    { 'title': '4-2-3-1', 'mainFormation': 11,
      'maxPlayers': 18, 'positionList': [''] },
    { 'title': '4-3-2-1', 'mainFormation': 11,
      'maxPlayers': 18, 'positionList': [''] },
    { 'title': '4-1-4-1', 'mainFormation': 11,
      'maxPlayers': 18, 'positionList': [''] },
    { 'title': '3-3-4', 'mainFormation': 11,
      'maxPlayers': 18, 'positionList': [''] },
    { 'title': '3-3-1-3', 'mainFormation': 11,
      'maxPlayers': 18, 'positionList': [''] },
    { 'title': '4-2-2-2', 'mainFormation': 11,
      'maxPlayers': 18, 'positionList': [''] }
  ];

  matches$: Observable<IMatch[]>;

  constructor(private afs: AngularFirestore) {
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

  getFormations(): IFormation[] {
    return this.formations;
  }

  getMatchById(matchId: string): Observable<IMatch> {
    return this.afs.doc<IMatch>(this.path + '/' + matchId).valueChanges();
  }

  setNewMatch(): Observable<IMatch> {
    return of({
      assignedCategories: {
        assignedCategory: '',
        assignedMainCategory: ''
      },
      assignedLocation: '',
      assignedTeam: '',
      homeTeam: {
        title: ''
      },
      guestTeam: {
        title: ''
      },
      isHomeTeam: true,
      isOfficialMatch: true,
      matchStartDate: Timestamp.now(),
      matchEndDate: null,
      matchLink: '',
      matchType: '',
      title: ''
    });
  }
}
