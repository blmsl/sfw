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
import { IUser } from '../../../shared/interfaces/user/user.interface';
import { AlertService } from '../../../shared/services/alert/alert.service';

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
    private alertService: AlertService,
    private teamService: TeamService) {
    this.categories$ = categoryService.getCategoriesByCategoryType('team.types');
    this.seasons$ = seasonService.seasons$;
    this.clubs$ = clubService.clubs$;
    this.teams$ = teamService.teams$;
  }

  removeTeam(team: ITeam) {
    this.teamService.removeTeam(team).then(
      () => this.alertService.showSnackBar('success', 'general.applications.removedMessage'),
      (error: any) => this.alertService.showSnackBar('error', error.message));
  }

  updateTeam(team: ITeam) {
    this.teamService.updateTeam(team.id, team).then(
      () => this.alertService.showSnackBar('success', 'general.applications.updatedMessage'),
      (error: any) => this.alertService.showSnackBar('error', error.message));
  }

}
