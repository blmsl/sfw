import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ITeamOfTheMonth } from '../../interfaces/member/team-of-the-month.interface';

@Injectable()
export class TeamOfTheMonthService {

  private collectionRef: AngularFirestoreCollection<ITeamOfTheMonth>;
  private path = `team-of-the-month`;

  teamsOfTheMonth$: Observable<ITeamOfTheMonth[]>;

  constructor(private afs: AngularFirestore) {
    this.collectionRef = this.afs.collection<ITeamOfTheMonth>(this.path);
    this.teamsOfTheMonth$ = this.collectionRef.valueChanges();
  }

}
