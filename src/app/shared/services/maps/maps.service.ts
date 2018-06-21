import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { IAddress } from '../../interfaces/location/address.interface';
import { Observable, Observer } from 'rxjs/Rx';

declare var google: any;

@Injectable()
export class MapsService {

  google: any;

  constructor(private http: HttpClient,
              private mapsAPILoader: MapsAPILoader) {
  }

  streetName?: string;        //
  houseNumber?: number | '';  //
  city?: string;              //
  zip?: number | '';          //
  county?: string;

  getLatLngFromAddress(address: IAddress): Observable<any> {

    const locationString = address.streetName + '' + address.houseNumber + ' ' + address.zip  + ' ' + address.city + ' ' + address.county;

    return Observable.create(observer => {
      this.mapsAPILoader.load().then(() => {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': locationString }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            observer.next(results[0].geometry.location);
            observer.complete();
          } else {
            console.log('Error - ', results, ' & Status - ', status);
            observer.next({});
            observer.complete();
          }
        });
      })
        .catch((err:any) => {
          console.log('Error -  & Status - ', err);
          observer.next({});
          observer.complete();
        });
    })
  }

  /*
if (navigator.geolocation) {

          navigator.geolocation.getCurrentPosition(function (position) {

            const center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log('center: ', center)

          }, function () {

            console.log('Error in the geolocation service.');
          });
        } else {

          console.log('Browser does not support geolocation.');
}
 */
}
