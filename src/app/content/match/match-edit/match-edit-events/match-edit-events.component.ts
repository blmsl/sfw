import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                              from '@angular/core';
import { IMatchEventCategory } from '../../../../shared/interfaces/match/match-event-category.interface';
import {
  FormArray,
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'match-edit-events',
  templateUrl: './match-edit-events.component.html',
  styleUrls: [ './match-edit-events.component.scss' ]
})
export class MatchEditEventsComponent implements OnInit {

  @Input() form: FormArray;
  @Input() eventCategories: IMatchEventCategory[];

  @Output() deleteMatchEvent: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() pullUp: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() pullDown: EventEmitter<any> = new EventEmitter<any>(false);

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.array(this.form.controls.sort((a,b) => {
      return (a.get('ordering').value > b.get('ordering').value) ? 1 : 0;
    }));
  }

}
