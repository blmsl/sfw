import { Pipe, PipeTransform } from '@angular/core';
import { IMember } from '../interfaces/member/member.interface';
import * as moment from 'moment';
import { after } from 'selenium-webdriver/testing';
import { Moment } from 'moment';

@Pipe({
  name: 'birthdayRangeFilter'
})
export class BirthdayRangeFilterPipe implements PipeTransform {

  transform(members: IMember[], beforeLimit: number, afterLimit: number): IMember[] {

    if (!members) {
      return;
    }

    return members.sort(this.sortByBirthday)
      .filter((member: IMember) => {
        if (!member.mainData.birthday) {
          return;
        }

        const currentDayOfYear = moment();
        const birthDayOfYear = moment(member.mainData.birthday);

        if (currentDayOfYear.dayOfYear() <= birthDayOfYear.dayOfYear() && currentDayOfYear.dayOfYear() + afterLimit >= birthDayOfYear.dayOfYear()) {
          return member;
        }

        if (currentDayOfYear.dayOfYear() >= birthDayOfYear.dayOfYear() && currentDayOfYear.dayOfYear() - beforeLimit <= birthDayOfYear.dayOfYear()) {
          return member;
        }

      });
  }

  sortByBirthday(a: IMember, b: IMember) {

    if (!a.mainData.birthday || !b.mainData.birthday)
      return null;

    const thisYear: any = moment().format('YYYY');
    let birthdayA: Moment = moment(a.mainData.birthday).set('year', thisYear);
    let birthdayB: Moment = moment(b.mainData.birthday).set('year', thisYear);

    if (birthdayA.unix() <= birthdayB.unix()) {
      return -1;
    }

    if (birthdayA.unix() > birthdayB.unix()) {
      return 1;
    }

    return 0;
  }

}
