import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { IApplication } from '../../../../shared/interfaces/application.interface';
import { ISocialNetwork } from '../../../../shared/interfaces/social-network.interface';
import { IGoogleCalendar } from '../../../../shared/interfaces/calendar/google-calendar.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'settings-social-data',
  templateUrl: './settings-social-data.component.html'
})
export class SettingsSocialDataComponent implements OnInit {

  @Input() application: IApplication;
  @Output() saveApplication: EventEmitter<IApplication> = new EventEmitter<IApplication>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      social: this.initSocialProviders()
    });

    this.form.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe((changes: ISocialNetwork[]) => {
      if (this.form.valid) {
        this.application = Object.assign({}, this.application, changes);
        this.saveApplication.emit(this.application);
      }
    });
  }

  initSocialProviders(): FormArray {
    const formArray = [];
    if (this.application.social) {
      for (let i = 0; i < this.application.social.length; i++) {
        formArray.push(this.initSocialProvider(this.application.social[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initSocialProvider(provider: ISocialNetwork): FormGroup {
    return this.fb.group({
      link: [provider.link, [Validators.required]],
      title: [provider.title, [Validators.required]]
    });
  }

  addSocialProvider(): void {
    const control = this.form.get('social') as FormArray;
    control.push(this.initSocialProvider({ link: '', title: '' }));
  }

  removeSocialProvider(i: number): void {
    const control = this.form.get('social') as FormArray;
    control.removeAt(i);
  }

}
