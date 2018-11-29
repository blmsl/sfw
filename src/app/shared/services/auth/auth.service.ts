import { Observable, of } from 'rxjs';

import { first, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IUser } from '../../interfaces/user/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { ApplicationService } from '../application/application.service';
import { take, tap } from 'rxjs/internal/operators';
import { ITeam } from '../../interfaces/team/team.interface';
import { ITeamOfTheMonth } from '../../interfaces/member/team-of-the-month.interface';
import { IApplication } from '../../interfaces/application.interface';

@Injectable()
export class AuthService {

  public user$: Observable<IUser>;
  public userId: string;

  constructor(private afAuth: AngularFireAuth,
              private applicationService: ApplicationService,
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

  public async signIn(credentials): Promise<any> {
    const signInAction = await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    if (signInAction.user) {
      await this.updateUser({
        id: signInAction.user.uid,
        lastSignInTime: signInAction.user.metadata.lastSignInTime,
        emailVerified: signInAction.user.emailVerified
      });
    }
    return signInAction;
  }

  public async register(values: IUser): Promise<any> {
    const registrationData = await this.applicationService.getAppData();
    const registerAction = await this.afAuth.auth.createUserWithEmailAndPassword(values.email, values.password);
    const sendVerificationMail = await this.sendVerificationMail();
    const updateUser = this.updateUser({
      id: registerAction.user.uid,
      emailVerified: registerAction.user.emailVerified,
      email: registerAction.user.email,
      creationTime: registerAction.user.metadata.creationTime,
      lastSignInTime: registerAction.user.metadata.lastSignInTime,
      assignedRoles: {
        admin: registrationData.registration && registrationData.registration === 'admin',
        editor: registrationData.registration && registrationData.registration === 'editor',
        subscriber: registrationData.registration && registrationData.registration === 'subscriber'
      }
    });
    return Promise.all([registerAction, sendVerificationMail, updateUser]);
  }

  private async oAuthLogin(provider) {
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

  googleLogin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin(): Promise<void> {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  sendVerificationMail(): Promise<void> {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  sendPasswordResetEmail(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signOut(): Promise<void> {
    delete this.userId;
    return this.afAuth.auth.signOut();
  }

  private updateUser(data: any): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${data.id}`);
    return userRef.set(data, { merge: true });
  }

  public getCreationBy(): string {
    return this.userId;
  }

  public getCreationAt(): any {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  public getUserId(): Promise<string> {
    return this.afAuth.authState.pipe(
      first(),
      map(user => {
        if (user) {
          return user.uid;
        }
      })
    ).toPromise();
  }

  public async isCurrentUser(userId: string): Promise<boolean> {
    const id = await this.getUserId();
    return userId === id;
  }

  public getPublicationStatus(): number {
    return 0;
  }

  public getPublicationBy(): string {
    return this.userId;
  }

  public getPublicationAt(): any {
    return firebase.firestore.FieldValue.serverTimestamp();
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
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.assignedRoles[role]) {
        return true;
      }
    }
    return false;
  }

}
