import { Component, Input } from '@angular/core';

@Component({
  selector: 'detail-link',
  templateUrl: 'detail-link.component.html'
})

export class DetailLinkComponent {

  @Input() objectId: string;
  @Input() title: string;

  constructor() {
  }

}
