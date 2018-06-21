import { Component, Input, OnInit } from '@angular/core';
import { ILocation } from '../../../../shared/interfaces/location/location.interface';
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

  public lat: number;
  public lng: number;

  public markers: IMarker[] = [];

  constructor(private mapsService: MapsService) {
  }

  ngOnInit() {
    this.getLatLng();
  }

  clickedMarker(/*label: string, index: number*/) {
    // console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked(/*$event: MouseEvent*/) {
    // console.log($event);
  }

  markerDragEnd(/*m: Marker, $event: MouseEvent*/) {
    // console.log('dragEnd', m, $event);
  }

  getLatLng() {
    this.mapsService.getLatLngFromAddress(this.location.address).subscribe(
      (response: any) => this.setMarker(response.lat(), response.lng()),
      (error: any) => this.errorMessage = <any>error
    );
  }

  setMarker(lat: number, lng: number) {

    this.lat = lat;
    this.lng = lng;

    this.markers.push({
      draggable: false,
      label: this.location.title,
      lat: lat,
      lng: lng
    });
  }

}
