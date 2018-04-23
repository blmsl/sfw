import { Injectable } from '@angular/core';
import { IMemberState } from '../../interfaces/member/member-state.interface';

@Injectable()
export class MemberStateService {

  private memberStates: IMemberState[] = [
    {
      title: 'none',
      value: 0
    },
    {
      title: 'member',
      value: 1
    },
    {
      title: 'honorary',
      value: 2
    },
    {
      title: 'child',
      value: 3
    },
    {
      title: 'teenager',
      value: 4
    },
    {
      title: 'family',
      value: 5
    },
    {
      title: 'gymnastics',
      value: 6
    }
  ];

  private ahStates: IMemberState[] = [
    {
      title: 'none',
      value: 0
    },
    {
      title: 'member',
      value: 1
    },
    {
      title: 'honorary',
      value: 2
    }
  ];

  constructor() {
  }

  getMemberStates() {
    return this.memberStates;
  }

  getMemberStateByValue(value: number) {
    const memberStateArray = this.memberStates.filter((memberState: IMemberState) => {
      return memberState.value === value;
    });
    if (memberStateArray.length === 1) {
      return memberStateArray[0].title;
    }
    return false;
  }

  getAHStates() {
    return this.ahStates;
  }

  getAHMemberStateByValue(value: number) {
    const memberStateArray = this.ahStates.filter((memberState: IMemberState) => {
      return memberState.value === value;
    });
    if (memberStateArray.length === 1) {
      return memberStateArray[0].title;
    }
    return false;
  }

}
