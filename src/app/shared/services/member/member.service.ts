import { Injectable } from '@angular/core';
import {
  forkJoin,
  Observable,
  of
} from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { IMember } from '../../interfaces/member/member.interface';
import { ILocationContact } from '../../interfaces/location/location-contact.interface';
import {
  map,
  take
} from 'rxjs/internal/operators';
import { ITeamManagement } from '../../interfaces/team/team-management.interface';
import { ICoord } from '../../interfaces/match/coord.interface';

@Injectable()
export class MemberService {

  private collectionRef: AngularFirestoreCollection<IMember>;
  private path: any = `members`;

  members$: Observable<IMember[]>;

  constructor(private afs: AngularFirestore) {
    this.collectionRef = this.afs.collection<IMember>(this.path);
    this.members$ = this.collectionRef.valueChanges().pipe(
      map((members: IMember[]) => {
        for (let i = 0; i < members.length; i++) {
          members[i].title = members[i].mainData.lastName + ' ' + members[i].mainData.firstName;
        }
        return members;
      })
    );
  }

  createMember(member: IMember): Promise<void> {
    member.id = this.afs.createId();
    return this.afs.collection(this.path).doc(member.id).set(member);
  }

  removeMember(member: IMember): Promise<void> {
    return this.afs.collection(this.path).doc(member.id).delete();
  }

  updateMember(memberId: string, member: IMember): Promise<void> {
    return this.afs.collection(this.path).doc(memberId).update(member);
  }

  getMemberById(memberId: string): Observable<IMember> {
    return this.afs.collection(this.path).doc<IMember>(memberId).valueChanges();
  }

  getMembersByBirthdayRange(start: string, limit: string): Observable<IMember[]> {
    return this.afs.collection<IMember>(this.path, ref =>
      ref
        .where('mainData.birthday.monthDay', '>=', start)
        .where('mainData.birthday.monthDay', '<=', limit))
      .valueChanges();
  }

  getMembersByIds(memberIds: string[]): Observable<IMember[]> {
    if (!memberIds || memberIds.length === 0) {
      return of([]);
    }

    let memberObservables: Observable<IMember>[] = [];
    for (let i = 0; i < memberIds.length; i++) {
      memberObservables.push(this.getMemberById(memberIds[i]).pipe(
        take(1)
      ));
    }
    return forkJoin(memberObservables);
  }

  getMembersByPosition(positions: {
    memberId: string;
    position: ICoord;
  }[]): Observable<IMember[]> {
    if (!positions || positions.length === 0) {
      return of([]);
    }

    let observables: Observable<IMember>[] = [];
    for (let i = 0; i < positions.length; i++) {
      if (positions[i].memberId !== '') {
        observables.push(this.getMemberById(positions[i].memberId).pipe(
          take(1)
        ));
      }
    }
    return forkJoin(observables);
  }

  getMembersByTeamPosition(memberIds: ITeamManagement[]): Observable<IMember[]> {
    if (!memberIds || memberIds.length === 0) {
      return of([]);
    }

    let observables: Observable<IMember>[] = [];
    for (let i = 0; i < memberIds.length; i++) {
      observables.push(this.getMemberById(memberIds[i].assignedMember).pipe(
        take(1)
      ));
    }
    return forkJoin(observables);
  }

  getMembersByLocationContacts(locationContacts: ILocationContact[]): Observable<IMember[]> {
    if (!locationContacts || locationContacts.length === 0) {
      return of([]);
    }

    let observables: Observable<IMember>[] = [];
    for (let i = 0; i < locationContacts.length; i++) {
      if (locationContacts[i].isMember) {
        observables.push(this.getMemberById(locationContacts[i].assignedMember).pipe(
          take(1)
        ));
      }
    }
    return forkJoin(observables);
  }

  getZodiac(birthday) {
    const dateOfBirth = new Date(birthday);
    const month = dateOfBirth.getMonth();
    const day = dateOfBirth.getDate();

    const zodiac = [
      'Capricorn',
      'Aquarius',
      'Pisces',
      'Aries',
      'Taurus',
      'Gemini',
      'Cancer',
      'Leo',
      'Virgo',
      'Libra',
      'Scorpio',
      'Sagittarius',
      'Capricorn'
    ];
    const lastDay = [19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
    return (day > lastDay[month]) ? zodiac[month * 1 + 1] : zodiac[month];
  }

  calculateAge(birthday): number {
    const dateOfBirth = new Date(birthday);
    const ageDifMs = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  setNewMember(): Observable<IMember> {
    return of(null);
    /*
     const mainData: IMemberMainData = {
     gender: 'male',
     birthday: moment().format('YYYY-MM-DD')
     };
     const otherData: IMemberOtherData = {};
     const address: IAddress = {};
     const contact: IContact = {};
     const clubData: IMemberData = {
     assignedMember: '',
     status: 0
     };
     const dfbData: IMemberDFBData = {
     guestPlayer: null
     };
     const profile: IProfile = {
     playerInfo: {
     strongFoot: ''
     },
     favorites: {}
     };
     const ahData: IMemberAHData = {
     status: 0
     };
     const data: IMember = {
     isImported: false,
     creation: this.authService.getCreation(),
     mainData: mainData,
     otherData: otherData,
     address: address,
     contact: contact,
     clubData: clubData,
     dfbData: dfbData,
     ahData: ahData,
     interview: [],
     profile: profile
     };
     return data;
     */
  }
}
