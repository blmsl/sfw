import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { TeamService } from '../../../shared/services/team/team.service';
import { ISeason } from '../../../shared/interfaces/season.interface';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ClubService } from '../../../shared/services/club/club.service';
import { CategoryService } from '../../../shared/services/category/category.service';
import { LocationService } from '../../../shared/services/location/location.service';
import { SeasonService } from '../../../shared/services/season/season.service';

@Component({
  selector: 'teams',
  templateUrl: './teams.component.html'
})

export class TeamsComponent {

  public categories$: Observable<ICategory[]>;
  public teams$: Observable<ITeam[]>;
  public clubs$: Observable<IClub[]>;
  public seasons$: Observable<ISeason[]>;

  constructor(private categoryService: CategoryService,
    private clubService: ClubService,
    private locationService: LocationService,
    private seasonService: SeasonService,
    private teamService: TeamService) {
    this.categories$ = categoryService.categories$;
    this.seasons$ = seasonService.seasons$;
    this.clubs$ = clubService.clubs$;
    this.teams$ = teamService.teams$;
  }

  removeTeam($event) {
    this.teamService.removeTeam($event).then();
  }

  updateTeam($event) {
    this.teamService.updateTeam($event.team.id, $event.team).then();
  }

}
