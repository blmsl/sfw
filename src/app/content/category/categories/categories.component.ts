import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html'
})

export class CategoriesComponent {

  categories$: Observable<ICategory[]>;
  categoryTypes$: Observable<ICategoryType[]>;

  constructor(private categoryService: CategoryService,
    private categoryTypeService: CategoryTypeService) {
    this.categories$ = categoryService.categories$;
    this.categoryTypes$ = categoryTypeService.categoryTypes$;
  }

  removeCategory($event) {
    this.categoryService.removeCategory($event).then();
  }

  updateCategory($event) {
    this.categoryService.updateCategory($event.category.id, $event.category).then();
  }

}
