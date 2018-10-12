import {
  Component,
  Input,
  OnInit
}                       from '@angular/core';
import { IMatch }       from '../../../../../shared/interfaces/match/match.interface';
import { MatchService } from '../../../../../shared/services/match/match.service';
import { ITeam }        from '../../../../../shared/interfaces/team/team.interface';

@Component({
  selector: 'team-detail-series',
  templateUrl: './team-detail-series.component.html',
  styleUrls: ['./team-detail-series.component.scss']
})
export class TeamDetailSeriesComponent implements OnInit {

  @Input() team: ITeam;

  public series: string[] = [];

  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.getSeriesForTeam(this.team.id);
  }

  private getSeriesForTeam(teamId: string) {
    this.matchService.getSeriesOfMatches(teamId).subscribe((matches: IMatch[]) => {

      if(!matches || matches.length === 0){
        return;
      }

      matches.forEach((match: IMatch) => {
        // console.log(match);
        if (match.result && match.result.guestTeamGoals && match.result.homeTeamGoals) {
          // Defeats
          if (match.isHomeTeam) {
            if (match.result.homeTeamGoals < match.result.guestTeamGoals) {
              this.series.push("V")
            } else if (match.result.homeTeamGoals > match.result.guestTeamGoals) {
              this.series.push("S")
            }
          } else {
            if (match.result.guestTeamGoals < match.result.homeTeamGoals) {
              this.series.push("V")
            } else if (match.result.guestTeamGoals > match.result.homeTeamGoals) {
              this.series.push("S")
            }
          }

          // Draws
          if (match.result.homeTeamGoals === match.result.guestTeamGoals) {
            this.series.push("U");
          }
        }
      });
      // ToDO: Serie der Mannschaft anzeigen
      console.log(this.series);
    });
  }

}
