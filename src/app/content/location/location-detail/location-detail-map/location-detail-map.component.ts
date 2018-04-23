import { Component, Input, OnInit } from '@angular/core';
import { Marker } from '@agm/core/services/google-maps-types';
import { ILocation } from '../../../../shared/interfaces/location.interface';
import { IMarker } from '../../../../shared/interfaces/marker.interface';
import { MapsService } from '../../../../shared/services/maps/maps.service';

@Component({

  selector: 'location-detail-map',
  templateUrl: 'location-detail-map.component.html',
  styleUrls: ['location-detail-map.scss']
})

export class LocationDetailMapComponent implements OnInit {

  @Input() location: ILocation;

  public response: any;
  public errorMessage: any;
  public formattedAddress: string;

  public zoom: number = 13;

  // initial center position for the map
  public lat: number = 51.673858;
  public lng: number = 7.815982;

  public markers: IMarker[] = [];

  constructor(private mapsService: MapsService) {
  }

  ngOnInit() {
    this.getLatLng();
  }

  clickedMarker(label: string, index: number) {
    // console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    // console.log($event);
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    // console.log('dragEnd', m, $event);
  }

  getLatLng() {
    const _that = this;
    this.mapsService.getLatLngFromAddress(this.location.address).subscribe(
      (response: any) => _that.setMarker(response),
      (error: any) => this.errorMessage = <any>error
    );
  }

  setMarker(response: any) {
    this.response = response.results[0];
    if (this.response) {

      this.formattedAddress = response.results[0].formatted_address;

      this.lat = response.results[0].geometry.location.lat;
      this.lng = response.results[0].geometry.location.lng;

      this.markers.push({
        draggable: false,
        label: this.location.title,
        lat: response.results[0].geometry.location.lat,
        lng: response.results[0].geometry.location.lng
      });
    }
  }

}
