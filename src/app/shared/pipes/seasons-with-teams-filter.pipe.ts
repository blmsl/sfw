import { Pipe, PipeTransform } from '@angular/core';
import { IMember } from '../interfaces/member/member.interface';
import { ITeam } from '../interfaces/team/team.interface';
import { ISeason } from '../interfaces/season.interface';

@Pipe({
  name: 'seasonsWithTeamsFilter'
})
export class SeasonsWithTeamsFilterPipe implements PipeTransform {

  transform(seasons: ISeason[], teams: ITeam[]): ISeason[] {

    if (!seasons || !teams) {
      return seasons;
    }

    let result = seasons.filter((season: ISeason) => {
      return teams.filter((team: ITeam) => {
        return team.assignedSeason && team.assignedSeason === season.id;
      });
    });

    console.log(result);
    return result;
  }

}
