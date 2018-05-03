import { Component, OnInit, ViewChild } from '@angular/core';
import { MatchService } from '../../../shared/services/match/match.service';
import { IMatch } from '../../../shared/interfaces/match.interface';
import { Observable, ObservableInput } from 'rxjs/index';
import { ICategory } from '../../../shared/interfaces/category.interface';
import * as moment from 'moment';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { CategoryService } from '../../../shared/services/category/category.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {

  public matches$: ObservableInput<IMatch[]>;
  public categories$: Observable<ICategory[]>;

  public inTwoWeeks = moment().add(2, 'weeks');
  public inLastTwoWeeks = moment().subtract(2, 'weeks');

  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;

  constructor(private categoryService: CategoryService,
              public matchService: MatchService) {
    this.matches$ = matchService.matches$;
    this.categories$ = categoryService.categories$;
  }

  ngOnInit() {
  }

}
