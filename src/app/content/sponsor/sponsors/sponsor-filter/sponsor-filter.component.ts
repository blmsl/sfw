import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'sponsor-filter',
  templateUrl: './sponsor-filter.component.html',
  styleUrls: ['./sponsor-filter.component.scss']
})
export class SponsorFilterComponent {

  @Input() categories: ICategory[];
  @Output() setFilters: EventEmitter<any> = new EventEmitter(false);

  constructor() {
  }

}
