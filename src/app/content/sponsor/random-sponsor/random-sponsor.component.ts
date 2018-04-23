import { Component, Input } from '@angular/core';
import { ISponsor } from '../../../shared/interfaces/sponsor.interface';
import { ICategory } from '../../../shared/interfaces/category.interface';

@Component({
  selector: 'random-sponsor',
  templateUrl: './random-sponsor.component.html'
})
export class RandomSponsorComponent {

  @Input() sponsors: ISponsor[];
  @Input() categories: ICategory[];

  constructor() {
  }

}
