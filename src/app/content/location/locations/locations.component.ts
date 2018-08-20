import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../shared/services/location/location.service';
import { ILocation } from '../../../shared/interfaces/location/location.interface';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../shared/services/category/category.service';

@Component({
  selector: 'locations',
  templateUrl: './locations.component.html'
})
export class LocationsComponent implements OnInit {

  public locations$: Observable<ILocation[]>;

  constructor(public categoryService: CategoryService,
              private locationService: LocationService) {
    this.locations$ = locationService.locations$;
  }

  ngOnInit(){

  }

}
