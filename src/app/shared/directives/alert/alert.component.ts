import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AlertService } from '../../services/alert/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {

  public message: any;
  private alertSubscription: Subscription;

  constructor(private _alertService: AlertService) {
  }

  ngOnInit() {
    this.alertSubscription = this._alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }
}
