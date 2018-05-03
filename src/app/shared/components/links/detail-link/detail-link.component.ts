import { Component, Input } from '@angular/core';

@Component({
  selector: 'detail-link',
  templateUrl: 'detail-link.component.html'
})

export class DetailLinkComponent {

  @Input() objectId: string;
  @Input() title: string;
  /* @Input() type: string;


  @Input() buttonType: string = 'mat-raised-button';
  @Input() buttonColor: string = '';
  @Input() showIcon: boolean;
  @Input() showText: boolean;
  @Input() buttonDisabledStatus: boolean = false; */

  constructor() {
  }

}
