import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { IClub } from '../../interfaces/club/club.interface';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ClubService {

  private collectionRef: AngularFirestoreCollection<IClub>;
  private path = `clubs`;

  clubs$: Observable<IClub[]>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.collectionRef = this.afs.collection<IClub>(this.path);
    this.clubs$ = this.collectionRef.valueChanges();
  }

  createClub(club: IClub): Promise<void> {
    club.id = this.afs.createId();
    return this.afs.collection(this.path).doc(club.id).set(club);
  }

  removeClub(club: IClub): Promise<void> {
    return this.afs.collection(this.path).doc(club.id).delete();
  }

  updateClub(clubId: string, club: IClub): Promise<any> {
    return this.afs.collection(this.path).doc(clubId).update(club);
  }

  getClubById(clubId: string): Observable<IClub | null> {
    return this.afs.doc<IClub>(this.path + '/' + clubId).valueChanges();
  }

  setNewClub(): Observable<IClub> {
    return of({
      title: '',
      description: '',
      info: {},
      creationAt: this.authService.getCreationAt(),
      creationBy: this.authService.getCreationBy(),
      fussballde: {},
      assignedFiles: [],
      timeLine: [],
      assignedLocation: null,
      honoraries: [],
      management: {
        positions: [],
        timeLine: []
      }
    });
  }
}
