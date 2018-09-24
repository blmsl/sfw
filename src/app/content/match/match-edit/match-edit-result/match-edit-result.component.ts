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
} from '@angular/forms';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/internal/operators';

@Component({
  selector: 'match-edit-result',
  templateUrl: './match-edit-result.component.html',
  styleUrls: ['./match-edit-result.component.scss']
})
export class MatchEditResultComponent implements OnInit {

  @Input() match: IMatch;
  @Input() otherMatchEventList: {
    id: number;
    title: string;
  }[];
  @Output() saveMatch: EventEmitter<IMatch> = new EventEmitter<IMatch>(false);

  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      result: this.initResult(this.match.result)
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IMatch) => {
      if (this.form.valid) {
        this.saveMatch.emit(changes);
      }
    });
  }

  initResult(result: {
    guestTeamGoals?: number | string,
    homeTeamGoals?: number | string,
    otherEvent?: number | string
  }): FormGroup {
    return this.fb.group({
      guestTeamGoals: result ? result.guestTeamGoals : null,
      homeTeamGoals: result ? result.homeTeamGoals : null,
      otherEvent: result ? result.otherEvent : null
    });
  }

}
