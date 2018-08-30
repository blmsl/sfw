import { Observable, of as observableOf } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { ICreation } from '../../interfaces/creation.interface';
import { IUser } from '../../interfaces/user/user.interface';
import { IPublication } from '../../interfaces/publication.interface';

// Presence System
// https://www.youtube.com/watch?v=2ZDeT5hLIBQ&feature=push-u&attr_tag=EDwjeHaWKNSWOoZT-6
// Role Management
// https://www.youtube.com/watch?v=3qODuvp1Zp8&feature=push-u&attr_tag=Kh7QBh7gxiT8VfyW-6

@Injectable()
export class AuthService implements OnDestroy {

  public user$: Observable<IUser>;
  public userId: string;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user: any) => {
        if (user) {
          this.userId = user.uid;
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return observableOf(null);
        }
      })
    );
  }

  ngOnDestroy() {
  }

  signIn(credentials): Promise<void> {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
      return this.updateUser({
        id: firebase.auth().currentUser.uid,
        emailVerified: firebase.auth().currentUser.emailVerified,
        email: firebase.auth().currentUser.email
      });
    }
    );
  }

  register(values: IUser): Promise<void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        return this.updateUser({
          id: firebase.auth().currentUser.uid,
          firstName: values.firstName,
          lastName: values.lastName,
          emailVerified: firebase.auth().currentUser.emailVerified,
          email: firebase.auth().currentUser.email
        });
      }).then(() => {
        let user: any = firebase.auth().currentUser;
        return user.sendEmailVerification();
      });
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then((credential) => {

      const data = {
        id: firebase.auth().currentUser.uid,
        displayName: credential.user.displayName,
        email: credential.user.email,
        emailVerified: true,
        assignedRoles: {
          subscriber: true,
          editor: false,
          admin: false
        }
      };

      return this.updateUser(data);
    });
  }

  googleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin(): Promise<any> {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  /* resendVerificationMail(): Promise<any> {
   return this.afAuth.auth.currentUser.sendEmailVerification();
   } */

  sendPasswordResetEmail(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  private updateUser(data: IUser): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${data.id}`);
    data.assignedRoles = {
      subscriber: true
    };
    return userRef.set(data, { merge: true });
  }

  public getCreation(): ICreation {
    return {
      at: <any>firebase.firestore.FieldValue.serverTimestamp(),
      by: this.userId
    };
  }

  public getPublication(): IPublication {
    return {
      status: 0,
      from: this.userId
    };
  }

  canRead(user: IUser): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canWrite(user: any): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: IUser): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: IUser): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: IUser, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.assignedRoles[role]) {
        return true
      }
    }
    return false;
  }

}
