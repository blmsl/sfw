import { Injectable } from '@angular/core';
import {
  forkJoin,
  Observable,
  of
} from 'rxjs';
import { ILocation } from '../../interfaces/location/location.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { ITraining } from '../../interfaces/training.interface';
import { take } from 'rxjs/internal/operators';

@Injectable()
export class LocationService {

  private collectionRef: AngularFirestoreCollection<ILocation>;
  private path = `locations`;
  locations$: Observable<ILocation[]>;

  constructor(private afs: AngularFirestore,
    private authService: AuthService) {
    this.collectionRef = this.afs.collection<ILocation>(this.path);
    this.locations$ = this.collectionRef.valueChanges();
  }

  createLocation(location: ILocation): Promise<void> {
    location.id = this.afs.createId();
    return this.afs.collection(this.path).doc(location.id).set(location);
  }

  removeLocation(location: ILocation): Promise<any> {
    return this.afs.collection(this.path).doc(location.id).delete();
  }

  updateLocation(locationId: string, location: ILocation): Promise<any> {
    return this.afs.collection(this.path).doc(locationId).update(location);
  }

  getLocationById(locationId: string): Observable<ILocation | null> {
    return this.afs.doc<ILocation>(this.path + '/' + locationId).valueChanges();
  }

  getLocationsByTraining(trainings: ITraining[]): Observable<ILocation[]> {
    if (!trainings || trainings.length === 0) {
      return of([]);
    }

    const observables: Observable<ILocation>[] = [];
    for (let i = 0; i < trainings.length; i++) {
      observables.push(this.getLocationById(trainings[i].assignedLocation).pipe(
        take(1)
      ));
    }
    return forkJoin(observables);
  }

  setNewLocation(): Observable<ILocation> {
    return of({
      isImported: false,
      assignedCategory: '',
      title: '',
      text: '',
      address: {},
      assignedImages: [],
      assignedMediaGalleries: [],
      creationAt: this.authService.getCreationAt(),
      creationBy: this.authService.getCreationBy()
    });
  }

}
