import { Pipe, PipeTransform } from '@angular/core';
import { IMember } from '../interfaces/member/member.interface';
import { Moment } from 'moment';

@Pipe({
  name: 'birthdayFilter'
})
export class BirthdayFilterPipe implements PipeTransform {

  transform(members: IMember[], searchString: Moment): IMember[] {

    if (!members || !searchString) {
      return members;
    }

    return members.filter((member: IMember) => {
      if (!member.mainData.birthday) {
        return;
      }
      return member.mainData.birthday.full.substring(5, 10) === searchString.format('MM-DD');
    });
  }

}
