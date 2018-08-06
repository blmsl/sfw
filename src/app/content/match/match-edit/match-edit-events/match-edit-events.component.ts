import {
  Component,
  OnInit
} from '@angular/core';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import { ActivatedRoute } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { IMatchEvent } from '../../../../shared/interfaces/match/match-event.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { Observable } from 'rxjs/index';
import { ICategory } from '../../../../shared/interfaces/category.interface';

@Component({
  selector: 'match-edit-events',
  templateUrl: './match-edit-events.component.html',
  styleUrls: ['./match-edit-events.component.scss']
})
export class MatchEditEventsComponent implements OnInit {

  public match: IMatch;
  public form: FormGroup;
  public selectedEvent: FormControl;
  public playMinutes: number[] = [];
  public categories$: Observable<ICategory[]>;

  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private fb: FormBuilder) {
    this.categories$ = categoryService.getCategoriesByCategoryType('match.event.types');
  }

  ngOnInit() {
    this.route.data.subscribe((data: { match: IMatch }) => this.match = data.match);


    this.form = this.fb.group({
      assignedEvents: this.initEvents(this.match.assignedEvents ? this.match.assignedEvents : [])
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IMatchEvent[]) => {
      console.log(changes);
      // this.match = Object.assign({}, this.match, changes);
      if (!this.form.invalid) {
        // this.saveMatch();
      }
    });

    this.initPlayMinutes();
  }

  initPlayMinutes() {
    for (let i = 1; i < 120; i++) {
      this.playMinutes.push(i);
    }
  }

  initEvents(assignedEvents: IMatchEvent[]): FormArray {
    const formArray = this.fb.array([]);
    for (let i = 0; i < assignedEvents.length; i++) {
      let formControl = this.createEvent(assignedEvents[i]);
      formArray.push(formControl);
    }
    return formArray;
  }

  createEvent(event?: IMatchEvent): FormGroup {
    return this.fb.group({
      assignedEventCategory: event ? event.assignedEventCategory : null,
      description: [event ? event.description : '', [Validators.required, Validators.minLength(5)]],
      playMinute: event ? event.playMinute : null,
      title: [event ? event.title : '', [Validators.required, Validators.minLength(5)]]
    });
  }

  addEvent() {
    const control = <FormArray>this.form.controls['assignedEvents'];
    control.push(this.createEvent());
    this.selectedEvent = this.form.controls['assignedEvents']['controls'][this.form.controls['assignedEvents']['controls'].length - 1];
  }

  cancel() {
    const index = this.form.controls['assignedEvents']['controls'].indexOf(this.selectedEvent);
    this.form.controls['assignedEvents']['controls'].splice(index, 1);
    this.selectedEvent = null;
  }

  saveEvent(): void {
    this.selectedEvent = null;
  }

}
