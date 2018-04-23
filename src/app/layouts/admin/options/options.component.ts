import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html'
})
export class OptionsComponent {

  @Input() currentLang;
  @Output() changeTranslation: EventEmitter<string> = new EventEmitter<string>(false);

  showSettings = false;
  options = {
    collapsed: false,
    compact: false,
    boxed: false,
    dark: false,
    dir: 'ltr'
  };

  @Output() messageEvent = new EventEmitter<Object>();

  constructor(public translate: TranslateService) {
  }

  sendOptions() {
    if (this.options.collapsed === true) {
      this.options.compact = false;
    }
    if (this.options.compact === true) {
      this.options.collapsed = false;
    }
    this.messageEvent.emit(this.options);
  }

}
