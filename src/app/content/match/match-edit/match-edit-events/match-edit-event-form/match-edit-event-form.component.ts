import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICategory } from '../../../../../shared/interfaces/category.interface';

@Component({
  selector: 'match-edit-event-form',
  templateUrl: './match-edit-event-form.component.html',
  styleUrls: ['./match-edit-event-form.component.scss']
})
export class MatchEditEventFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() assignedEventCategories: ICategory[];
  @Input() playMinutes: number[];

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>(false);
  @Output() save: EventEmitter<void> = new EventEmitter<void>(false);

  constructor() {
  }

  ngOnInit() {
  }

}
