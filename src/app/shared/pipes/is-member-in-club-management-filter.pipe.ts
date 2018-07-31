import { Pipe, PipeTransform } from '@angular/core';
import { IMember } from '../interfaces/member/member.interface';
import { ITeam } from '../interfaces/team/team.interface';
import { IClub } from "../interfaces/club/club.interface";

@Pipe({
  name: 'isMemberInClubManagementFilter'
})
export class IsMemberInClubManagementFilterPipe implements PipeTransform {

  transform(clubs: IClub[], member: IMember): IClub[] {

    if (!clubs || !member) {
      return clubs;
    }

    let result = clubs.filter((club: IClub) => {

      if (!club.management || !club.management.positions) return false;

      for (let i = 0; i < club.management.positions.length; i++) {
        if (club.management.positions[i].assignedMember === member.id) {
          return true;
        }
      }
    });

    return result;
  }

}
