import {
  Component,
  OnInit
}                          from '@angular/core';
import {
  FormBuilder,
  FormGroup
}                          from '@angular/forms';
import { Observable }      from 'rxjs/index';
import { ICategory }       from '../../../shared/interfaces/category.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { MatchService }    from '../../../shared/services/match/match.service';
import { IMatch }          from '../../../shared/interfaces/match/match.interface';

@Component({
  selector: 'match-table',
  templateUrl: './match-table.component.html',
  styleUrls: [ './match-table.component.scss' ]
})
export class MatchTableComponent implements OnInit {

  form: FormGroup;
  public categories$: Observable<ICategory[]>;
  public matches$: Observable<IMatch[]>;

  constructor(public categoryService: CategoryService,
              private matchService: MatchService,
              private fb: FormBuilder) {
    this.matches$ = matchService.matches$;
    this.categories$ = this.categoryService.getCategoriesByCategoryType('team.types');
  }

  ngOnInit() {
    this.form = this.fb.group({
      limit: 50,
      searchFor: '',
      selectedDate: ''
    });
  }

}
