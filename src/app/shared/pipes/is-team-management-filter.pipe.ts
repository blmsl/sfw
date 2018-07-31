import { Pipe, PipeTransform } from '@angular/core';
import { IMember } from '../interfaces/member/member.interface';
import { ITeam } from '../interfaces/team/team.interface';

@Pipe({
  name: 'isTeamManagementFilter'
})
export class IsTeamManagementFilterPipe implements PipeTransform {

  transform(teams: ITeam[], member: IMember): ITeam[] {

    if (!teams || !member) {
      return teams;
    }

    let result = teams.filter((team: ITeam) => {

      if (!team.assignedPositions) return false;

      for (let i = 0; i < team.assignedPositions.length; i++) {
        if (team.assignedPositions[i].assignedMember === member.id) {
          return true;
        }
      }
    });

    return result;
  }

}
