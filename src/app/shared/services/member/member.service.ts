import { Injectable } from '@angular/core';
import { Observable, of ,  forkJoin } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IMember } from '../../interfaces/member/member.interface';
import { ILocationContact } from '../../interfaces/location/location-contact.interface';

@Injectable()
export class MemberService {

  private collectionRef: AngularFirestoreCollection<IMember>;
  private path = `members`;

  members$: Observable<IMember[]>;

  constructor(private afs: AngularFirestore) {
    this.collectionRef = this.afs.collection<IMember>(this.path);
    this.members$ = this.collectionRef.valueChanges();
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

  getMemberById(memberId: string): Observable<IMember | null> {
    return this.afs.collection(this.path).doc<IMember>(memberId).valueChanges();
  }

  getMembersByIds(memberIds: {
    memberId: string;
    position: string;
  }[]): Observable<IMember[]> {
    if (!memberIds || memberIds.length === 0) {
      return of([]);
    }

    let memberObservables: Observable<IMember>[] = [];
    for (let i = 0; i < memberIds.length; i++) {
      memberObservables.push(this.getMemberById(memberIds[i].memberId));
    }
    return forkJoin(memberObservables);
  }

  getMembersByLocationContacts(locationContacts: ILocationContact[]): Observable<IMember[]> {
    if (!locationContacts || locationContacts.length === 0) {
      return of([]);
    }

    let memberObservables: Observable<IMember>[] = [];
    for (let i = 0; i < locationContacts.length; i++) {
      if (locationContacts[i].isMember) {
        memberObservables.push(this.getMemberById(locationContacts[i].assignedMember));
      }
    }
    return forkJoin(memberObservables);
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
