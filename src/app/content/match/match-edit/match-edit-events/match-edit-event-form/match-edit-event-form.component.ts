import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                        from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
}                        from '@angular/forms';
import { ICategory }     from '../../../../../shared/interfaces/category.interface';
import { IMatchEvent }   from '../../../../../shared/interfaces/match/match-event.interface';
import { ICategoryType } from '../../../../../shared/interfaces/category-type.interface';

@Component({
  selector: 'match-edit-event-form',
  templateUrl: './match-edit-event-form.component.html',
  styleUrls: ['./match-edit-event-form.component.scss']
})
export class MatchEditEventFormComponent implements OnInit {

  @Input() categories: ICategory[];
  @Input() categoryTypes: ICategoryType[];

  @Output() saveMatchEvent: EventEmitter<IMatchEvent> = new EventEmitter<IMatchEvent>(false);

  public playMinutes: number[] = [];
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    this.form = this.fb.group({
      assignedCategory: null,
      description: [ '', [Validators.required, Validators.minLength(5)]],
      playMinute:  null,
      title: ''
    });

    this.initPlayMinutes();
  }

  initPlayMinutes() {
    for (let i = 1; i < 120; i++) {
      this.playMinutes.push(i);
    }
  }

  save($event){
    this.saveMatchEvent.emit($event);
    this.form.reset();
  }

  cancel(){
    this.form.reset();
  }

}
