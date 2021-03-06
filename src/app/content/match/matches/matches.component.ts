import { Component, OnInit, ViewChild } from '@angular/core';
import { IMatch } from '../../../shared/interfaces/match/match.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { MatchService } from '../../../shared/services/match/match.service';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { Observable } from 'rxjs/index';
import * as moment from 'moment';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { LocationService } from '../../../shared/services/location/location.service';
import { ILocation } from '../../../shared/interfaces/location/location.interface';

@Component({
  selector: 'matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  public matches$: Observable<IMatch[]>;
  public categories$: Observable<ICategory[]>;
  public locations$: Observable<ILocation[]>;

  public inTwoWeeks = moment().add(2, 'weeks');
  public inLastTwoWeeks = moment().subtract(2, 'weeks');

  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private categoryService: CategoryService,
    private locationService: LocationService,
    public matchService: MatchService) {
    this.matches$ = matchService.matches$;
    this.categories$ = categoryService.getCategoriesByCategoryType('team.types');
    this.locations$ = locationService.locations$;
  }

  ngOnInit() {
  }

}
