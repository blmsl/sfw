import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
}                    from '@angular/core';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { IMatch }    from '../../../../shared/interfaces/match/match.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'match-table-list',
  templateUrl: './match-table-list.component.html',
  styleUrls: [ './match-table-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchTableListComponent implements OnInit {

  @Input() matches: IMatch[];
  @Input() categories: ICategory[];
  @Input() form: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

}
