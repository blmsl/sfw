import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IUser } from '../../../../shared/interfaces/user/user.interface';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../../shared/services/user/user.service';
import { ILocation } from '../../../../shared/interfaces/location.interface';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';
import { ISeason } from '../../../../shared/interfaces/season.interface';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { CategoryTypeService } from '../../../../shared/services/category-type/category-type.service';
import { LocationService } from '../../../../shared/services/location/location.service';
import { SeasonService } from '../../../../shared/services/season/season.service';
import { TeamService } from '../../../../shared/services/team/team.service';
import { ApplicationService } from '../../../../shared/services/application/application.service';
import { IApplication } from '../../../../shared/interfaces/application.interface';

@Component({
  selector: 'article-edit-sidebar',
  templateUrl: './article-edit-sidebar.component.html',
  styleUrls: ['./article-edit-sidebar.component.scss']
})
export class ArticleEditSidebarComponent {

  @Input() form: FormGroup;

  public applications$: Observable<IApplication[]>;
  public categories$: Observable<ICategory[]>;
  public categoryTypes$: Observable<ICategoryType[]>;
  public locations$: Observable<ILocation[]>;
  public seasons$: Observable<ISeason[]>;
  public teams$: Observable<ITeam[]>;
  public users$: Observable<IUser[]>;

  @Output() removeArticle: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  private selectedTab: number;

  constructor(private userService: UserService,
              private applicationService: ApplicationService,
              private categoryService: CategoryService,
              private categoryTypeService: CategoryTypeService,
              private locationService: LocationService,
              private seasonService: SeasonService,
              private teamService: TeamService) {
    this.users$ = userService.users$;
  }

  onTabChange($event): void{
    this.selectedTab = $event.index;

    if(this.selectedTab === 1 && !this.categories$){
      this.categories$ = this.categoryService.categories$;
      this.categoryTypes$ = this.categoryTypeService.categoryTypes$;
      this.locations$ = this.locationService.locations$;
      this.seasons$ = this.seasonService.seasons$;
      this.teams$ = this.teamService.teams$;
    }
    if(this.selectedTab === 2){
      this.applications$ = this.applicationService.applications$;
    }

  }

}
