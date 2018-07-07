import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'settings-social-data',
  templateUrl: './settings-social-data.component.html'
})
export class SettingsSocialDataComponent implements AfterViewChecked {

  @Input() form: FormGroup;
  @Output() removeSocialProvider: EventEmitter<number> = new EventEmitter(false);
  @Output() addSocialProvider: EventEmitter<boolean> = new EventEmitter(false);

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

}
