import { Component } from '@angular/core';
import { CategoryService } from '../../../shared/services/category/category.service';
import { CategoryTypeService } from '../../../shared/services/category-type/category-type.service';
import { LocationService } from '../../../shared/services/location/location.service';
import { ILocation } from '../../../shared/interfaces/location/location.interface';
import { Observable } from 'rxjs';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../shared/interfaces/category-type.interface';

@Component({
  selector: 'locations',
  templateUrl: './locations.component.html'
})
export class LocationsComponent {

  public categories$: Observable<ICategory[]>;
  public categoryTypes$: Observable<ICategoryType[]>;
  public locations$: Observable<ILocation[]>;

  constructor(private categoryService: CategoryService,
    private categoryTypeService: CategoryTypeService,
    private locationService: LocationService, ) {
    this.categories$ = categoryService.categories$;
    this.categoryTypes$ = categoryTypeService.categoryTypes$;
    this.locations$ = locationService.locations$;
  }

}
