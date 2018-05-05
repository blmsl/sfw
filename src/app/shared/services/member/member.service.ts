import { Injectable } from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


import { IMember } from '../../interfaces/member/member.interface';

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

  updateMember(memberId: string, member: IMember): Promise<any> {
    return this.afs.collection(this.path).doc(memberId).update(member);
  }

  getMemberById(memberId: string): Observable<IMember | null> {
    return this.afs.doc<IMember>(this.path + '/' + memberId).valueChanges();
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

  calculateAge(birthday) {
    const dateOfBirth = new Date(birthday);
    const ageDifMs = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getProfileImage(member: IMember) {
    return member.profileImageUrl
      ? member.profileImageUrl
      : (member.mainData.gender === 'female'
        ? 'assets/images/placeholder/avatar_female.jpg'
        : 'assets/images/placeholder/avatar_male.jpg');
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
