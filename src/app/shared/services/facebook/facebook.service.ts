import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class FacebookService {

  private accessToken = '';
  // 'EAARJOZBpKJeYBAGS8e8OkbEBPwf9T8UvYwFc7McWGt7TZBw74khzX3shYR7r06JA3FD1zqUlDNl76uVAxXaCigTSmdPSPUct3s093ZCW0CGNPfr66NeGrgQTqozBLX13XF5HnOquR9sJDtaCIX3hvfnpHy32XiW8n7FFx0WCLk99QQbNSmk';

  private graphUrl = 'https://graph.facebook.com/';
  private graphQuery = `?access_token=${this.accessToken}&date_format=U&fields=posts{from,created_time,message,attachments}`;

  constructor(private http: HttpClient) { }

  getPosts(pageName: string): Observable<any> {
    let url = this.graphUrl + pageName + this.graphQuery;

    return this.http
      .get(url)
      .pipe(
        map((response: Response) => {
          console.log(response.json());
        })
      );
  }
}
