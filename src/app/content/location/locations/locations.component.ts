import { Component, OnInit } from '@angular/core';
import { LocationService }   from '../../../shared/services/location/location.service';
import { ILocation }         from '../../../shared/interfaces/location/location.interface';
import { Observable }        from 'rxjs';
import { CategoryService }   from '../../../shared/services/category/category.service';
import { ICategory }         from '../../../shared/interfaces/category.interface';

@Component({
  selector: 'locations',
  templateUrl: './locations.component.html'
})
export class LocationsComponent implements OnInit {

  public locations$: Observable<ILocation[]>;
  public categories$: Observable<ICategory[]>;

  constructor(public categoryService: CategoryService,
              private locationService: LocationService) {
    this.locations$ = locationService.locations$;
    this.categories$ = this.categoryService.getCategoriesByCategoryType('location.types');
  }

  ngOnInit(){
  }

}
