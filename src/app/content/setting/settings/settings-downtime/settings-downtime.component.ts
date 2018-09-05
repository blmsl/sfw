import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
}                                   from '@angular/forms';
import { IApplication }             from '../../../../shared/interfaces/application.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { IMailList }                from '../../../../shared/interfaces/mail-list.interface';

@Component({
  selector: 'settings-downtime',
  templateUrl: './settings-downtime.component.html',
  styleUrls: ['./settings-downtime.component.scss']
})
export class SettingsDowntimeComponent implements OnInit {

  @Input() application: IApplication;
  @Output() saveApplication: EventEmitter<IApplication> = new EventEmitter<IApplication>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      downtime: this.fb.group({
        isEnabled: this.application.downtime.isEnabled,
        message: this.application.downtime.message
      }),
    });

    this.form.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe((changes: any) => {
      if (this.form.valid) {
        this.application = Object.assign({}, this.application, changes);
        this.saveApplication.emit(this.application);
      }
    });
  }

}
