import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class FacebookService {

  private accessToken = '';

  private graphUrl = 'https://graph.facebook.com/';
  private graphQuery = `?access_token=${this.accessToken}&date_format=U&fields=posts{from,created_time,message,attachments}`;

  constructor(private http: HttpClient) { }

  getPosts(pageName: string): Observable<any> {
    const url = this.graphUrl + pageName + this.graphQuery;

    return this.http
      .get(url)
      .pipe(
        map((response: Response) => {
          console.log(response.json());
        })
      );
  }
}
