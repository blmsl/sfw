import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApplication } from '../../interfaces/application.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators';

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

  getAppData(): any {
    return this.getCurrentApplication().pipe(
      map((applications: IApplication[]) => {
      return applications[0].registration;
    }));
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
    const weekdays = [];
    for (let i = 0; i < 7; i++) {
      weekdays.push(i);
    }
    return weekdays;
  }

}
