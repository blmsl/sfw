import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'sponsor-filter',
  templateUrl: './sponsor-filter.component.html',
  styleUrls: ['./sponsor-filter.component.scss']
})
export class SponsorFilterComponent implements OnChanges {

  @Input() categories: ICategory[];
  @Output() setFilters: EventEmitter<any> = new EventEmitter(false);
  public form: FormGroup;
  public options: any[] = [];

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges() {
    if (this.categories) {
      for (let i = 0; i < this.categories.length; i++) {
        this.options[this.categories[i].id] = true;
      }
      this.form = this.fb.group(this.options);
    }
  }

  submitFilter() {
    const categoryIds = [];
    Object.keys(this.form.controls).forEach(key => {
      if (this.form.get(key).value) {
        categoryIds.push(key);
      }
    });
    this.setFilters.emit(categoryIds);
  }

}
