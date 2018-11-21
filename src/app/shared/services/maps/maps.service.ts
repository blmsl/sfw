import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { IAddress } from '../../interfaces/location/address.interface';
import { Observable } from 'rxjs/index';

declare var google: any;

@Injectable()
export class MapsService {

  public google: any;

  public center: {
    latitude: number;
    longitude: number;
  } = {
      latitude: 49.480584,
      longitude: 7.097050
    };

  constructor(private http: HttpClient,
    private mapsAPILoader: MapsAPILoader) {
  }

  async getMapCenter(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: Position) => {
          return resolve(position);
        });
      } else {
        const position = {
          coords: this.center,
          timestamp: +new Date()
        };
        return resolve(position);
      }
    });
  }


  getLatLngFromAddress(address: IAddress): Observable<any> {

    const locationString = address.streetName + '' + address.houseNumber + ' ' + address.zip + ' ' + address.city + ' ' + address.county;

    return Observable.create(observer => {
      this.mapsAPILoader.load().then(() => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': locationString }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            observer.next(results[0].geometry.location);
            observer.complete();
          } else {
            observer.error(status);
          }
        });
      }).catch((err: any) => {
        observer.error(err);
      });
    });
  }

}
