import { Pipe, PipeTransform } from '@angular/core';
import { IMatch } from '../interfaces/match/match.interface';

@Pipe({
  name: 'matchNoResultFilter'
})
export class MatchNoResultFilterPipe implements PipeTransform {

  transform(matches: IMatch[]): IMatch[] {

    if (!matches) {
      return;
    }

    return matches.filter((match: IMatch) => {
      return !match.result
        || (
          (!match.result.homeTeamGoals || match.result.homeTeamGoals === '')
          && (!match.result.guestTeamGoals || match.result.guestTeamGoals === '')
          && (!match.result.otherEvent || match.result.otherEvent === '')
        );
    });
  }

}
