import { Component } from '@angular/core';
import { LocationService } from '../../../shared/services/location/location.service';
import { Observable } from 'rxjs';
import { ILocation } from '../../../shared/interfaces/location.interface';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { CategoryService } from '../../../shared/services/category/category.service';

@Component({
  selector: 'location-statistics',
  templateUrl: './location-statistics.component.html',
  styleUrls: ['./location-statistics.component.scss']
})
export class LocationStatisticsComponent {

  public locations$: Observable<ILocation[]>;
  public categories$: Observable<ICategory[]>;

  constructor(private locationService: LocationService, private categoryService: CategoryService) {
    this.locations$ = locationService.locations$;
    this.categories$ = categoryService.getCategoriesByCategoryType('location.types');
  }

}
