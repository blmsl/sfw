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
import { ICategory } from '../../../../../shared/interfaces/category.interface';
import { IMatchEvent } from '../../../../../shared/interfaces/match/match-event.interface';
import { ICategoryType } from '../../../../../shared/interfaces/category-type.interface';

@Component({
  selector: 'match-edit-event-form',
  templateUrl: './match-edit-event-form.component.html',
  styleUrls: ['./match-edit-event-form.component.scss']
})
export class MatchEditEventFormComponent implements OnInit {

  @Input() eventCategories: ICategory[];
  @Output() saveMatchEvent: EventEmitter<IMatchEvent> = new EventEmitter<IMatchEvent>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    this.form = this.fb.group({
      assignedCategory: null,
      description: ['', [Validators.required, Validators.minLength(5)]],
      playMinute: null,
      title: ''
    });
  }


  save($event) {
    this.saveMatchEvent.emit($event);
    this.form.reset();
  }

  cancel() {
    this.form.reset();
  }

}
