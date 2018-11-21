import {
  Component,
  OnInit
} from '@angular/core';
import { ISeason } from '../../../shared/interfaces/season.interface';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { SeasonService } from '../../../shared/services/season/season.service';
import { TeamService } from '../../../shared/services/team/team.service';
import { CategoryService } from '../../../shared/services/category/category.service';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ILineChartData } from '../../../shared/interfaces/chart/line-chart-data.interface';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'team-statistics',
  templateUrl: './team-statistics.component.html',
  styleUrls: ['./team-statistics.component.scss']
})
export class TeamStatisticsComponent implements OnInit {

  public isLoaded = false;

  public lineChartData: ILineChartData[] = [];
  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartLabels: string[] = [];

  constructor(private seasonService: SeasonService,
    private categoryService: CategoryService,
    private teamService: TeamService) {

    combineLatest(
      seasonService.seasons$,
      categoryService.getCategoriesByCategoryType('team.types'),
      teamService.teams$
    ).subscribe((results: any) => {

      results[1].forEach((category: ICategory, index: number) => {

        const teamCountArray: number[] = [];

        results[0].forEach((season: ISeason) => {

          if (this.lineChartLabels.indexOf(season.title) === -1) {
            this.lineChartLabels.push(season.title);
          }

          const test = results[2].filter((team: ITeam) => {
            return team.assignedSeason === season.id && team.assignedTeamCategories.indexOf(category.id) > -1;
          });
          teamCountArray.push(test.length);
        });

        this.lineChartData[index] = {
          data: teamCountArray,
          'label': category.title
        };
      });

      this.isLoaded = true;
    });

  }

  ngOnInit() {
  }

}
