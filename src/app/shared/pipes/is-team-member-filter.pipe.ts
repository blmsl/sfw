import { Pipe, PipeTransform } from '@angular/core';
import { IMember } from '../interfaces/member/member.interface';
import { ITeam } from '../interfaces/team/team.interface';

@Pipe({
  name: 'isTeamMemberFilter'
})
export class IsTeamMemberFilterPipe implements PipeTransform {

  transform(teams: ITeam[], member: IMember, field: string): ITeam[] {

    if (!teams || !member) {
      return teams;
    }

    const result = teams.filter((team: ITeam) => {
      return team[field] && team[field].indexOf(member.id) > -1;
    });

    return result;
  }

}
