import {
  Component, Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AlertService } from '../../services/alert/alert.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {

  public message: string = '';
  private alertSubscription: Subscription;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {
                message: string,
                status: string
              },
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.alertSubscription = this.translateService.get(this.data.message).subscribe(
      (translation: string) => this.message = translation,
      (error: any) => this.message = error
    );
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }
}
