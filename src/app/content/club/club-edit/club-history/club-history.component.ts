import {
  Component,
  EventEmitter,
  OnInit,
  Output
}                         from '@angular/core';
import {
  FormBuilder,
  FormGroup
}                         from '@angular/forms';
import { IClub }          from '../../../../shared/interfaces/club/club.interface';
import {
  debounceTime,
  distinctUntilChanged
}                         from 'rxjs/internal/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'club-history',
  templateUrl: './club-history.component.html',
  styleUrls: [ './club-history.component.scss' ]
})
export class ClubHistoryComponent implements OnInit {

  @Output() saveClub: EventEmitter<IClub> = new EventEmitter<IClub>(false);

  public form: FormGroup;
  public club: IClub;

  public froalaOptions: Object = {
    height: '55vh'
  };

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => {
      this.club = data.club;
    });

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
