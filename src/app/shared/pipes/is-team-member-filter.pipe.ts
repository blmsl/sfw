import { Pipe, PipeTransform } from '@angular/core';
import { IMember } from '../interfaces/member/member.interface';
import { ITeam } from '../interfaces/team/team.interface';

@Pipe({
  name: 'isTeamMemberFilter'
})
export class IsTeamMemberFilterPipe implements PipeTransform {

  transform(teams: ITeam[], member: IMember): ITeam[] {

    if (!teams || !member) {
      return teams;
    }

    let result = teams.filter((team: ITeam) => {
      return team.assignedPlayers && team.assignedPlayers.indexOf(member.id) > -1;
    });

    console.log(result);
    return result;
  }

}
