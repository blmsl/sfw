import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICategory } from '../../../../../shared/interfaces/category.interface';

@Component({
  selector: 'static-page',
  templateUrl: './static-page.component.html'
})
export class StaticPageComponent {

  @Input() form: FormGroup;
  @Input() selectedStaticPage: number;
  @Input() categories: ICategory[];

  @Output() removeStaticPage: EventEmitter<number> = new EventEmitter(false);
  @Output() setSelectedStaticPage: EventEmitter<number> = new EventEmitter(false);

  constructor() {
  }

}
