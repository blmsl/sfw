import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IApplication } from '../../interfaces/application.interface';
import { IMatch } from '../../interfaces/match/match.interface';

@Injectable()
export class ApplicationService {

  private collectionRef: AngularFirestoreCollection<IApplication>;
  private path = `applications`;
  applications$: Observable<IApplication[]>;

  constructor(private afs: AngularFirestore) {
    this.collectionRef = this.afs.collection<IApplication>(this.path);
    this.applications$ = this.collectionRef.valueChanges();
  }

  createApplication(application: IApplication): Promise<void> {
    if (!application.id) {
      application.id = this.afs.createId();
    }
    return this.afs.collection(this.path).doc(application.id).set(application);
  }

  updateApplication(applicationId: string, application: IApplication): Promise<any> {
    return this.afs.collection(this.path).doc(applicationId).update(application);
  }

  getCurrentApplication(): Observable<IApplication[]> {
    return this.afs.collection<IApplication>(this.path, ref =>
      ref.where('isCurrentApplication', '==', true)
    ).valueChanges();
  }

  setNewApplication(): IApplication {
    return {
      id: this.afs.createId(),
      page: {
        isEnabled: true,
        name: '',
        email: '',
        title: ''
      },
      urlShortening: 0,
      registration: '0',
      downtime: {
        isEnabled: false,
        message: ''
      },
      staticPages: [],
      social: []
    };
  }

  getWeekdays(): number[] {
    let weekdays = [];
    for (let i = 0; i < 7; i++) {
      weekdays.push(i);
    }
    return weekdays;
  }

}
