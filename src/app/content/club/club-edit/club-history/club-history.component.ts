import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
}                               from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
}                               from '@angular/forms';
import { ITimeLineEvent }       from '../../../../shared/interfaces/time-line-event.interface';
import * as moment              from 'moment';
import { IClub }                from '../../../../shared/interfaces/club/club.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/internal/operators';

@Component({
  selector: 'club-history',
  templateUrl: './club-history.component.html',
  styleUrls: ['./club-history.component.scss']
})
export class ClubHistoryComponent implements OnInit {

  @Input() club: IClub;
  @Output() saveClub: EventEmitter<IClub> = new EventEmitter<IClub>(false);

  public form: FormGroup;

  public froalaOptions: Object = {
    height: '55vh'
  };

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      history: this.club.history
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IClub) => {
      if (this.form.valid) {
        this.saveClub.emit(changes);
      }
    });
  }

}
