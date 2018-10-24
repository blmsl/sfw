import {
  Observable,
  of
} from 'rxjs';

import {
  first,
  map,
  switchMap
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { ICreation } from '../../interfaces/creation.interface';
import { IUser } from '../../interfaces/user/user.interface';
import { IPublication } from '../../interfaces/publication.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

// Presence System
// https://www.youtube.com/watch?v=2ZDeT5hLIBQ&feature=push-u&attr_tag=EDwjeHaWKNSWOoZT-6
// Role Management
// https://www.youtube.com/watch?v=3qODuvp1Zp8&feature=push-u&attr_tag=Kh7QBh7gxiT8VfyW-6

@Injectable()
export class AuthService {

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
          return of(null);
        }
      })
    );
  }

  public async signIn(credentials): Promise<void> {
    const signInAction = await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    return this.updateUser({
      lastSignInTime: signInAction.user.metadata.lastSignInTime
    });
  }

  public async register(values: IUser): Promise<void> {
    const registerAction = await this.afAuth.auth.createUserWithEmailAndPassword(values.email, values.password);
    await this.updateUser({
      id: registerAction.user.uid,
      emailVerified: registerAction.user.emailVerified,
      email: registerAction.user.email,
      creationTime: registerAction.user.metadata.creationTime,
      lastSignInTime: registerAction.user.metadata.lastSignInTime,
      assignedRoles: {
        admin: false,
        editor: false,
        subscriber: true
      }
    });
    return registerAction.user.sendEmailVerification();
  }

  /* private async oAuthLogin(provider) {
   const loginAction = await this.afAuth.auth.signInWithPopup(provider);

   return this.updateUser({
   id: loginAction.user.uid,
   displayName: loginAction.user.displayName,
   emailVerified: true,
   email: loginAction.user.email,
   creationTime: loginAction.user.metadata.creationTime,
   lastSignInTime: loginAction.user.metadata.lastSignInTime,
   assignedRoles: {
   subscriber: true,
   editor: false,
   admin: false
   }
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

   resendVerificationMail(): Promise<any> {
   return this.afAuth.auth.currentUser.sendEmailVerification();
   }*/

  sendPasswordResetEmail(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signOut(): Promise<any> {
    delete this.userId;
    return this.afAuth.auth.signOut();
  }

  private updateUser(data: any): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${data.id}`);
    return userRef.set(data, { merge: true });
  }

  public getCreation(): ICreation {
    return {
      at: firebase.firestore.FieldValue.serverTimestamp(),
      by: 'this.userId'
    };
  }

  public getUserId(): Promise<string> {
    return this.afAuth.authState.pipe(
      first(),
      map(user => {
        console.log(user.uid);
        if (user)
          return user.uid;
      })
    ).toPromise();
  }

  public async isCurrentUser(userId: string): Promise<boolean> {
    const id = await this.getUserId();
    return userId === id;
  }

  public getPublication(): IPublication {
    return {
      status: 0,
      from: 'this.userId'
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
        return true;
      }
    }
    return false;
  }

}
