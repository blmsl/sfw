import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IMemberOfTheWeek } from '../../interfaces/member/member-of-the-week.interface';

@Injectable()
export class MemberOfTheWeekService {

  private collectionRef: AngularFirestoreCollection<IMemberOfTheWeek>;
  private path = `member-of-the-week`;

  membersOfTheWeek$: Observable<IMemberOfTheWeek[]>;

  constructor(private afs: AngularFirestore) {
    this.collectionRef = this.afs.collection<IMemberOfTheWeek>(this.path);
    this.membersOfTheWeek$ = this.collectionRef.valueChanges();
  }

}
