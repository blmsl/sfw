import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  public message = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {
    message: string,
    status: string
  },
    private translateService: TranslateService) {
  }

  ngOnInit() {
    this.translateService.get(this.data.message).subscribe(
      (translation: string) => this.message = translation,
      (error: any) => this.message = error
    );
  }

}
