import {
  Component,
  OnInit
} from '@angular/core';
import { MatchService } from '../../../shared/services/match/match.service';
import { IMatch } from '../../../shared/interfaces/match/match.interface';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { CategoryService } from '../../../shared/services/category/category.service';
import { ICategory } from '../../../shared/interfaces/category.interface';

@Component({
  selector: 'article-matches',
  templateUrl: './article-matches.component.html'
})
export class ArticleMatchesComponent implements OnInit {

  public matches$: Observable<IMatch[]>;
  public categories$: Observable<ICategory[]>;

  public inTwoWeeks = moment().add(2, 'weeks');
  public inLastTwoWeeks = moment().subtract(2, 'weeks');

  constructor(public matchService: MatchService,
    private categoryService: CategoryService) {
    this.matches$ = matchService.matches$;
    this.categories$ = categoryService.categories$;
  }

  ngOnInit() {
  }

}
