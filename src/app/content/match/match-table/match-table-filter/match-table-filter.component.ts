import {
  Component,
  Input,
  OnInit
}                    from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMatch }    from '../../../../shared/interfaces/match/match.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'match-table-filter',
  templateUrl: './match-table-filter.component.html',
  styleUrls: ['./match-table-filter.component.scss']
})
export class MatchTableFilterComponent implements OnInit {

  @Input() matches: IMatch[];
  @Input() categories: ICategory[];
  @Input() form: FormGroup;

  public itemsPerPageOptions = [5, 10, 25, 50, 100];

  constructor() { }

  ngOnInit() {
  }

}
