import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { TeamService } from '../../../shared/services/team/team.service';
import { UserService } from '../../../shared/services/user/user.service';
import { IUser } from '../../../shared/interfaces/user/user.interface';
import { ClubService } from '../../../shared/services/club/club.service';
import { IClub } from '../../../shared/interfaces/club/club.interface';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { MemberService } from '../../../shared/services/member/member.service';
import { IMember } from '../../../shared/interfaces/member/member.interface';
import { ISeason } from '../../../shared/interfaces/season.interface';
import { SeasonService } from '../../../shared/services/season/season.service';
import { LocationService } from '../../../shared/services/location/location.service';
import { ILocation } from '../../../shared/interfaces/location/location.interface';
// import { ITimeLineEvent }      from '../../../shared/interfaces/time-line-event.interface';
import { AlertService } from '../../../shared/services/alert/alert.service';

@Component({
  selector: 'team-edit',
  templateUrl: 'team-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TeamEditComponent implements OnInit {

  public team: ITeam;
  public members$: Observable<IMember[]>;
  public users$: Observable<IUser[]>;
  public clubs$: Observable<IClub[]>;
  public seasons$: Observable<ISeason[]>;
  public categories$: Observable<ICategory[]>;
  public teamPositionCategories$: Observable<ICategory[]>;
  public locations$: Observable<ILocation[]>;

  constructor(private teamService: TeamService,
              private categoryTypeService: CategoryTypeService,
              private memberService: MemberService,
              private seasonService: SeasonService,
              private clubService: ClubService,
              private categoryService: CategoryService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private router: Router,
              private alertService: AlertService,
              private locationService: LocationService,
              private userService: UserService) {
    this.users$ = userService.users$;
    this.members$ = memberService.members$;
    this.clubs$ = clubService.clubs$;
    this.categories$ = categoryService.categories$;
    this.teamPositionCategories$ = categoryService.getCategoriesByCategoryType('team.position.types');
    this.seasons$ = seasonService.seasons$;
    this.locations$ = locationService.locations$;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { team: ITeam }) => {
      this.team = data.team;
    });
  }

  saveTeam(changes: ITeam): void {
    this.team = Object.assign({}, this.team, changes);
    let action;

    if (this.team.id) {
      action = this.teamService.updateTeam(this.team.id, this.team);
    } else {
      action = this.teamService.createTeam(this.team);
    }
    action.then(
      () => this.alertService.showSnackBar('success', 'general.applications.updateMessage'),
      (error: any) => this.alertService.showSnackBar('error', error.message)
    );
  }

  removeTeam(team: ITeam) {
    if (!team.id) {
      this.alertService.showSnackBar('success', 'general.applications.canceledAction', 2500);
      this.redirectToList();
    } else {
      this.teamService.removeTeam(team).then(
        () => this.alertService.showSnackBar('success', 'general.applications.removedMessage', 2500),
        (error: any) => this.alertService.showSnackBar('error', error.message)
      );
    }
  }

  redirectToList() {
    this.router.navigate(['list']).then();
  }


}
