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
}                          from '@angular/forms';
import { IApplication }    from '../../../../shared/interfaces/application.interface';
import { IGoogleCalendar } from '../../../../shared/interfaces/calendar/google-calendar.interface';
import {
  debounceTime,
  distinctUntilChanged
}                          from 'rxjs/operators';

@Component({
  selector: 'settings-calendars',
  templateUrl: './settings-calendars.component.html',
  styleUrls: [ './settings-calendars.component.scss' ]
})
export class SettingsCalendarsComponent implements OnInit {

  @Input() application: IApplication;
  @Output() saveApplication: EventEmitter<IApplication> = new EventEmitter<IApplication>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedCalendars: this.initCalendars()
    });

    this.form.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged()
    ).subscribe((changes: IGoogleCalendar[]) => {
      if (this.form.valid) {
        this.application = Object.assign({}, this.application, changes);
        this.saveApplication.emit(this.application);
      }
    });
  }

  initCalendars(): FormArray {
    const formArray = [];
    if (this.application.assignedCalendars) {
      for (let i = 0; i < this.application.assignedCalendars.length; i++) {
        formArray.push(this.initCalendar(this.application.assignedCalendars[ i ]));
      }
    }
    return this.fb.array(formArray);
  }

  initCalendar(calendar: IGoogleCalendar): FormGroup {
    return this.fb.group({
      link: [ calendar.link, [ Validators.required ] ],
      title: [ calendar.title, [ Validators.required ] ]
    });
  }

  addCalendar() {
    const control = this.form.get('assignedCalendars') as FormArray;
    control.push(this.initCalendar({ title: '', link: '' }));
  }

  deleteCalendar(i: number) {
    const control = this.form.get('assignedCalendars') as FormArray;
    control.removeAt(i);
  }

}
