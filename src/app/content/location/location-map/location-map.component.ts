import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapsService } from '../../../shared/services/maps/maps.service';
import { Observable } from 'rxjs';
import { IMarker } from '../../../shared/interfaces/marker.interface';
import { ILocation } from '../../../shared/interfaces/location/location.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { LocationService } from '../../../shared/services/location/location.service';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { FormGroup } from '@angular/forms';
import { MatListOption, MatSelectionList } from '@angular/material';
import { ILocationFilter } from '../../../shared/interfaces/location/location-filter.interface';
import { AlertService } from '../../../shared/services/alert/alert.service';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'location-map',
  templateUrl: './location-map.component.html',
  styleUrls: [
    'location-map.component.scss'
  ]
})
export class LocationMapComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public locations$: Observable<ILocation[]>;
  public categories$: Observable<ICategory[]>;

  public zoom: number = 10;
  public latitude: number;
  public longitude: number;
  public markers: IMarker[] = [];
  public markerSubscriptions: Subscription[] = [];

  public config: PerfectScrollbarConfigInterface = {};

  public categoriesFilter: string[] = [];
  public titleFilter: string = '';

  @ViewChild(PerfectScrollbarDirective) directiveScroll: PerfectScrollbarDirective;
  @ViewChild(MatSelectionList) selectedLocations: MatSelectionList;

  constructor(public categoryService: CategoryService,
    private locationService: LocationService,
    private alertService: AlertService,
    private mapsService: MapsService) {
    this.categories$ = categoryService.getCategoriesByCategoryType('location.types');
    this.locations$ = locationService.locations$;
  }

  ngOnInit() {
    this.mapsService.getMapCenter().then((position: Position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  }

  ngOnDestroy() {
    this.markerSubscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  changeFilters($event: ILocationFilter): void {
    this.categoriesFilter = $event.categoriesFilter;
    this.titleFilter = $event.titleFilter;
  }

  toggleLocationsMarker(): void {
    let selectedLocations = this.selectedLocations.selectedOptions.selected;
    selectedLocations.forEach((option: MatListOption) => {
      this.getLatLng(option.value);
    });
  }

  getLatLng(location): void {
    let subscription = this.mapsService.getLatLngFromAddress(location.address).subscribe(
      (response: any) => this.setMarker(location, response.lat(), response.lng()),
      (error: any) => this.alertService.showSnackBar('error', 'general.locations.map.' + error)
    );
    this.markerSubscriptions.push(subscription);
  }

  setMarker(location: ILocation, lat: number, lng: number): void {
    const marker: IMarker = {
      draggable: false,
      label: location.title,
      lat: lat,
      lng: lng
    };
    this.markers.push(marker);
  }

  resetMarkers(): void {
    this.markers = [];
    this.selectedLocations.deselectAll();
  }

  mapClicked($event) {
    console.log($event);
  }

}
