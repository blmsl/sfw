import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { IAddress } from '../../interfaces/address.interface';

@Injectable()
export class MapsService {

  private mapsAPI: string = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) {
  }

  getLatLngFromAddress(address: IAddress) {
    let params: HttpParams = new HttpParams(); // URLSearchParams = new URLSearchParams();
    params = params.append('address', address.streetName + ' ' + address.zip + ' ' + address.city);
    params.append('sensor', '0');

    return this.http.get(this.mapsAPI, {
      params: params
    }).pipe(
      map((response: Response) => {
        this.extractData(response);
      })
    );
  }

  private extractData(response: Response) {
    return response;
  }

}
