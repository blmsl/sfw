import { Injectable }           from '@angular/core';
import { HttpClient }           from '@angular/common/http';
import { ApplicationService }   from '../application/application.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable }           from 'rxjs/index';

@Injectable()
export class CalendarService {

  constructor(private httpClient: HttpClient,
              private applicationService: ApplicationService,
              private fns: AngularFireFunctions) {
  }

  public getCalendars(): Observable<any> {
    const callable = this.fns.httpsCallable('googleCalendar');
    return callable({});
  }

}
