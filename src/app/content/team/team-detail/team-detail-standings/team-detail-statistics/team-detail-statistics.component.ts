import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../../../shared/interfaces/team/team.interface';
import { IMatch } from '../../../../../shared/interfaces/match/match.interface';
import { MatchService } from '../../../../../shared/services/match/match.service';

@Component({
  selector: 'team-detail-statistics',
  templateUrl: './team-detail-statistics.component.html',
  styleUrls: ['./team-detail-statistics.component.scss']
})
export class TeamDetailStatisticsComponent implements OnInit {

  @Input() team: ITeam;

  public highestWin: IMatch;
  public defeats: IMatch[] = [];
  public wins: IMatch[] = [];
  public draws: IMatch[] = [];
  public highestDefeat: IMatch;

  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.getMatchesForTeam(this.team.id);
  }

  private getMatchesForTeam(teamId: string) {
    this.matchService.getMatchesWithResult(teamId).subscribe((matches: IMatch[]) => {

      if (!matches || matches.length === 0) {
        return;
      }

      matches.forEach((match: IMatch) => {
        if (match.result && match.result.guestTeamGoals && match.result.homeTeamGoals) {
          if (match.isHomeTeam) {
            if (match.result.homeTeamGoals < match.result.guestTeamGoals) {
              this.defeats.push(match)
            } else if (match.result.homeTeamGoals > match.result.guestTeamGoals) {
              this.wins.push(match)
            }
          } else {
            if (match.result.guestTeamGoals < match.result.homeTeamGoals) {
              this.defeats.push(match)
            } else if (match.result.guestTeamGoals > match.result.homeTeamGoals) {
              this.wins.push(match)
            }
          }

          if (match.result.homeTeamGoals === match.result.guestTeamGoals) {
            this.draws.push(match)
          }
        }
      });

      if (this.defeats.length > 0) {
        this.highestDefeat = this.highestForArray(this.defeats);
      }

      if (this.wins.length > 0) {
        this.highestWin = this.highestForArray(this.wins);
      }
    });
  }

  private highestForArray(array: IMatch[]) {
    return array.reduce((previousValue, currentValue) => {

      const previousDiff = Math.abs(Number(previousValue.result.guestTeamGoals) - Number(previousValue.result.homeTeamGoals));
      const currentDiff = Math.abs(Number(currentValue.result.guestTeamGoals) - Number(currentValue.result.homeTeamGoals));

      if (previousDiff > currentDiff) {
        return previousValue;
      } else {
        return currentValue;
      }
    });
  }

}
