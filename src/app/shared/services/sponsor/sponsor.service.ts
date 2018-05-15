import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import { ISponsor } from '../../interfaces/sponsor.interface';
import { IMediaItem } from '../../interfaces/media/media-item.interface';

@Injectable()
export class SponsorService {

  private collectionRef: AngularFirestoreCollection<ISponsor>;
  private path = `sponsors`;
  sponsors$: Observable<ISponsor[]>;

  constructor(private afs: AngularFirestore,
    private authService: AuthService) {
    this.collectionRef = this.afs.collection<ISponsor>(this.path);
    this.sponsors$ = this.collectionRef.valueChanges();
  }

  createSponsor(sponsor: ISponsor): Promise<void> {
    sponsor.id = this.afs.createId();
    return this.afs.collection(this.path).doc(sponsor.id).set(sponsor);
  }

  removeSponsor(sponsor: ISponsor): Promise<any> {
    return this.afs.collection(this.path).doc(sponsor.id).delete();
  }

  updateSponsor(sponsorId: string, sponsor: ISponsor): Promise<any> {
    return this.afs.collection(this.path).doc(sponsorId).update(sponsor);
  }

  getSponsorById(sponsorId: string): Observable<ISponsor | null> {
    return this.afs.doc<ISponsor>(this.path + '/' + sponsorId).valueChanges();
  }

  setNewSponsor(): Observable<ISponsor> {
    return of({
      title: '',
      internalInfo: '',
      description: '',
      assignedCategories: [],
      creation: this.authService.getCreation()
    });
  }

  /*
  getSponsorsForSeason(seasonRange: any): Observable<any> {
    return this.afs.collection(this.path, ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query
        .where('sponsorDate', '>=', seasonRange.startDate.toISOString())
        .where('sponsorDate', '<', seasonRange.endDate.toISOString());
      return query;
    }).valueChanges();
  } */

}
