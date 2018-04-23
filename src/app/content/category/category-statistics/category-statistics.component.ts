import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { CategoryService } from '../../../shared/services/category/category.service';

@Component({
  selector: 'category-statistics',
  templateUrl: './category-statistics.component.html',
  styleUrls: ['./category-statistics.component.scss']
})
export class CategoryStatisticsComponent {

  categories$: Observable<ICategory[]>;
  categoryTypes$: Observable<ICategoryType[]>;

  constructor(private categoryService: CategoryService,
    private categoryTypeService: CategoryTypeService) {
    this.categories$ = categoryService.categories$;
    this.categoryTypes$ = categoryTypeService.categoryTypes$;
  }

}
