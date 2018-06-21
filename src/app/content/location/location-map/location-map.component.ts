import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { MapsService } from '../../../shared/services/maps/maps.service';
import { Observable } from 'rxjs';
import { IMarker } from '../../../shared/interfaces/marker.interface';
import { ILocation } from '../../../shared/interfaces/location/location.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { LocationService } from '../../../shared/services/location/location.service';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';
import { ICategory } from '../../../shared/interfaces/category.interface';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'location-map',
  templateUrl: './location-map.component.html',
  styleUrls: [
    'location-map.component.scss'
  ]
})
export class LocationMapComponent implements OnInit {

  public form: FormGroup;
  public locations$: Observable<ILocation[]>;
  public categories$: Observable<ICategory[]>;

  public response: any;
  public errorMessage: any;

  public zoom: number = 10;
  public markers: IMarker[] = [];

  // initial center position for the map
  public lat: number = 49.480584;
  public lng: number = 7.097050;

  public config: PerfectScrollbarConfigInterface = {};

  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;
  public mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(public categoryService: CategoryService,
    private locationService: LocationService,
    private mapsService: MapsService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.categories$ = categoryService.getCategoriesByCategoryType('location.types');
    this.locations$ = locationService.locations$;
  }

  ngOnInit() {
    this.form = this.fb.group({
      selectedOptions: [],
      categoryFilter: [],
      title: []
    });

    this.form.valueChanges.subscribe((changes: {
      selectedOptions: ILocation[],
      categoryFilter: string[]
    }) => {
      this.toggleLocationsMarker(changes.selectedOptions);
    });
  }

  toggleLocationsMarker(locations: ILocation[]) {
    this.resetMarkers();
    if (locations) {
      locations.forEach((location: ILocation) => {
        this.getLatLng(location);
      });
    }
  }

  getLatLng(location: ILocation) {
    const _that = this;
    this.mapsService.getLatLngFromAddress(location.address).subscribe(
      (response: any) => _that.setMarker(response, location),
      (error: any) => this.errorMessage = <any>error
    );
  }

  setMarker(response: any, location: ILocation) {
    this.response = response.results[0];
    if (this.response) {

      this.lat = response.results[0].geometry.location.lat;
      this.lng = response.results[0].geometry.location.lng;

      this.markers.push({
        draggable: false,
        label: location.title,
        lat: response.results[0].geometry.location.lat,
        lng: response.results[0].geometry.location.lng
      });
    }
  }

  resetMarkers(resetList?: boolean) {
    this.markers = [];
    if (resetList) {
      this.resetFilters();
    }
  }

  resetFilters() {
    this.form.reset();
  }

}
