import { Component, Input } from '@angular/core';

@Component({
  selector: 'edit-link',
  templateUrl: 'edit-link.component.html'
})

export class EditLinkComponent {

  @Input() objectId: string;
  @Input() type: string;
  @Input() cssClass: string;
  @Input() showIcon: boolean;
  @Input() showText: boolean;

  constructor() {
  }

}
