import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { ISeason } from '../../../../shared/interfaces/season.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { IMediaItem } from '../../../../shared/interfaces/media/media-item.interface';
import { MediaItemService } from '../../../../shared/services/media/media-item.service';
import { Observable } from 'rxjs/index';
import { MatchService } from "src/app/shared/services/match/match.service";
import { IMatch } from "src/app/shared/interfaces/match/match.interface";

@Component({
  selector: 'team-detail-main',
  templateUrl: './team-detail-main.component.html',
  styleUrls: ['./team-detail-main.component.scss']
})
export class TeamDetailMainComponent implements OnInit {

  @Input() team: ITeam;
  @Input() seasons: ISeason[];
  @Input() clubs: IClub[];
  @Input() categories: ICategory[];

  public teamLogo: Observable<IMediaItem>;
  public teamImage: Observable<IMediaItem>;

  constructor(private mediaItemService: MediaItemService, private matchService: MatchService) {
  }

  ngOnInit() {
    if (this.team) {
      if (!this.teamLogo) {
        this.teamLogo = this.mediaItemService.getCurrentImage(['teams', 'logo'], this.team.id);
      }
      if (!this.teamImage) {
        this.teamImage = this.mediaItemService.getCurrentImage(['teams', 'profile'], this.team.id);
      }
    }

    this.getSeriesForTeam(this.team.id);
    this.getMatchesForTeam(this.team.id);
  }

  private getMatchesForTeam(teamId: string) {
    this.matchService.getMatchesWithResult(teamId).subscribe((matches: IMatch[]) => {
      let defeats: IMatch[] = [];
      let wins: IMatch[] = [];
      let draws: IMatch[] = [];
      let highestWin: IMatch;
      let highestDefeat: IMatch;

      matches.forEach( (match: IMatch) => {
        if (match.result.guestTeamGoals != null && match.result.homeTeamGoals != null) {
          if (match.isHomeTeam) {
            if (match.result.homeTeamGoals < match.result.guestTeamGoals) {
              defeats.push(match)
            } else if (match.result.homeTeamGoals > match.result.guestTeamGoals) {
              wins.push(match)
            }
          } else {
            if (match.result.guestTeamGoals < match.result.homeTeamGoals) {
              defeats.push(match)
            } else if (match.result.guestTeamGoals > match.result.homeTeamGoals) {
              wins.push(match)
            }
          }

          if (match.result.homeTeamGoals === match.result.guestTeamGoals) {
            draws.push(match)
          }
        }
      });

      highestDefeat = this.highestForArray(defeats);
      highestWin = this.highestForArray(wins);

      console.log(defeats);
      console.log(wins);
      console.log(highestDefeat);
      console.log(highestWin)
    })
  }

  private highestForArray(array: IMatch[]) {
    return array.reduce( (previousValue, currentValue) => {

      const previousDiff = Math.abs(Number(previousValue.result.guestTeamGoals) - Number(previousValue.result.homeTeamGoals));
      const currentDiff = Math.abs(Number(currentValue.result.guestTeamGoals) - Number(currentValue.result.homeTeamGoals));

      if (previousDiff > currentDiff) {
        return previousValue;
      } else {
        return currentValue;
      }
    });
  }

  private getSeriesForTeam(teamId: string) {
    const series: string[] = [];

    this.matchService.getSeriesOfMatches(teamId).subscribe( (matches: IMatch[]) => {
      matches.forEach( (match: IMatch) => {
        if (match.result.guestTeamGoals && match.result.homeTeamGoals) {
          // Defeats
          if (match.isHomeTeam) {
            if (match.result.homeTeamGoals < match.result.guestTeamGoals) {
              series.push("V")
            } else if (match.result.homeTeamGoals > match.result.guestTeamGoals) {
              series.push("S")
            }
          } else {
            if (match.result.guestTeamGoals < match.result.homeTeamGoals) {
              series.push("V")
            } else if (match.result.guestTeamGoals > match.result.homeTeamGoals) {
              series.push("S")
            }
          }

          // Draws
          if (match.result.homeTeamGoals === match.result.guestTeamGoals) {
            series.push("U");
          }
        }
      });
      console.log(series);

    });

  }
}
