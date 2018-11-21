import {
  Injectable,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {
  Observable,
  Subject
} from 'rxjs';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar/typings/snack-bar-config';

@Injectable()
export class AlertService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private _router: Router,
    public snackBar: MatSnackBar) {
    // clear alert message on route change
    _router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'danger', text: message });
  }

  showSnackBar(status: string, message: string, duration?: number, horizontalPosition?: MatSnackBarHorizontalPosition, verticalPosition?: MatSnackBarVerticalPosition) {
    const config: MatSnackBarConfig = {
      data: {
        status: status,
        message: message
      },
      duration: duration ? duration : 2500,
      horizontalPosition: horizontalPosition ? horizontalPosition : 'right',
      verticalPosition: verticalPosition ? verticalPosition : 'top'
    };
    this.snackBar.openFromComponent(SnackbarComponent, config);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
