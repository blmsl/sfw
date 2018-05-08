
import { of as observableOf, Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import {
  Injectable,
  OnDestroy
} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import * as moment from 'moment';
import { ICreation } from '../../interfaces/creation.interface';
import { IUser } from '../../interfaces/user/user.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { first } from 'rxjs/internal/operators';

// Presence System
// https://www.youtube.com/watch?v=2ZDeT5hLIBQ&feature=push-u&attr_tag=EDwjeHaWKNSWOoZT-6
// Role Management
// https://www.youtube.com/watch?v=3qODuvp1Zp8&feature=push-u&attr_tag=Kh7QBh7gxiT8VfyW-6

@Injectable()
export class AuthService implements OnDestroy {

  public user$: Observable<IUser | null>;
  // private mouseEvents: ISubscription;
  // private timer: ISubscription;
  // private authSubscription: ISubscription;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private afs: AngularFirestore) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user: any) => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return observableOf(null);
        }
      }));
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  ngOnDestroy() {
    //this.authSubscription.unsubscribe();
    //this.mouseEvents.unsubscribe();
    //this.timer.unsubscribe();
  }

  signIn(credentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    /*
      .then(
        (authUser: firebase.User) => {
          if (authUser.emailVerified) {
            return this.updateUser({
              emailVerified: authUser.emailVerified,
              email: authUser.email
            });
          }
        }
      ); */
  }

  register(values: IUser): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(values.email, values.password);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        return this.updateUser(credential.user);
      });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
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

  private updateUser(data: any): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.afAuth.auth.currentUser.uid}`);
    return userRef.set(data, { merge: true });
  }

  public getCreation(): ICreation {
    return {
      at: moment().toISOString(),
      from: this.afAuth.auth.currentUser.uid
    };
  }

  /*
   private updateOnConnect() {
   return this.db.object('.info/connected').valueChanges().do(connected => {
   console.log(connected);

   let status = connected.$value ? 'online' : 'offline'
   return this.setUser({
   onlineStatus: status
   });
   })
   .subscribe();
   const userStatusDatabaseRef = firebase.database().ref(`/status/${this.id}`);

   return this.afs.doc('.info').valueChanges().subscribe((connected: any) => {
   console.log(connected);
   const status = connected.$value ? 'online' : 'offline';
   return this.setUser({
   onlineStatus: status
   });
   });
   }

   /*
   private updateOnIdle() {
   this.mouseEvents = fromEvent(document, 'mousemove')
   .pipe(throttleTime(30000))
   .subscribe(() => {
   this.updateUser({
   onlineStatus: 'online'
   }).then(() => this.resetTimer());
   });
   }

   private resetTimer() {
   if (this.timer) {
   this.timer.unsubscribe();
   }

   this.timer = timer(40000).subscribe(() => {
   this.updateUser({
   onlineStatus: 'away'
   }).then(
   // () => this.router.navigate(['/locked']).then()
   );
   });
   }*/

  canRead(user: IUser): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canWrite(user: IUser): boolean {
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
    for (const role in allowedRoles) {
      if (user && user.assignedRoles[allowedRoles[role]]) {
        return true;
      }
    }
    return false;
  }

}
