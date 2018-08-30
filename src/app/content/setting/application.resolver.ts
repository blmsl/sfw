import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { IApplication } from '../../shared/interfaces/application.interface';
import { ApplicationService } from '../../shared/services/application/application.service';
import {
  map,
  take
} from 'rxjs/operators';

@Injectable()
export class ApplicationResolver implements Resolve<IApplication> {

  constructor(private applicationService: ApplicationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IApplication> {

    return this.applicationService.getCurrentApplication().pipe(
      take(1),
      map((applications: IApplication[]) => {
        if (!applications || applications.length === 0) {
          const app = this.applicationService.setNewApplication();
          this.applicationService.createApplication(app).then();
          return app;
        } else {
          return applications[0];
        }
      })
    );
  }
}
