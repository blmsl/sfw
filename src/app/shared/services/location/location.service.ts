import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { ILocation } from '../../interfaces/location.interface';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';

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

  /*
  getLocationsForSeason(seasonRange: any): Observable<any> {
    return this.afs.collection(this.path, ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query
        .where('locationDate', '>=', seasonRange.startDate.toISOString())
        .where('locationDate', '<', seasonRange.endDate.toISOString());
      return query;
    }).valueChanges();
  } */

  setNewLocation(): Observable<ILocation> {
    return of({
      isImported: false,
      assignedCategory: '',
      title: '',
      text: '',
      address: {},
      assignedImages: [],
      assignedMediaGalleries: [],
      creation: this.authService.getCreation()
    });
  }

}
