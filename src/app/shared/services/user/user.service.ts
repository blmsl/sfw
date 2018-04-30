import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
}                     from 'angularfire2/firestore';
import { IUser }      from '../../interfaces/user/user.interface';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  private collectionRef: AngularFirestoreCollection<IUser>;
  private path = `users`;

  users$: Observable<IUser[]>;

  constructor(private afs: AngularFirestore) {
    this.collectionRef = this.afs.collection<IUser>(this.path);
    this.users$ = this.collectionRef.valueChanges();
  }

  createUser(user: IUser): Promise<void> {
    user.id = this.afs.createId();
    return this.afs.collection<IUser>(this.path).doc(user.id).set(user);
  }

  removeUser(userId: string): Promise<any> {
    return this.afs.collection<IUser>(this.path).doc(userId).delete();
  }

  updateUser(userId: string, user: IUser): Promise<any> {
    return this.afs.collection<IUser>(this.path).doc(userId).update(user);
  }

  getUserById(userId: string): Observable<IUser> {
    return this.afs.doc<IUser>(this.path + '/' + userId).valueChanges();
  }

  setNewUser(): IUser {
    return {
      firstName: '',
      lastName: '',
      email: '',
      providerId: 'firebase',
      assignedRoles: {
        subscriber: true,
        editor: false,
        admin: false
      }
    };
  }

}
