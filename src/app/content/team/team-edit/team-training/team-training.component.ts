import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                             from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
}                             from '@angular/forms';
import { ILocation }          from '../../../../shared/interfaces/location/location.interface';
import { ApplicationService } from '../../../../shared/services/application/application.service';
import { ITeam }              from '../../../../shared/interfaces/team/team.interface';
import {
  debounceTime,
  distinctUntilChanged
}                             from 'rxjs/internal/operators';
import { ITraining }          from '../../../../shared/interfaces/training.interface';

@Component({
  selector: 'team-training',
  templateUrl: './team-training.component.html'
})
export class TeamTrainingComponent implements OnInit {

  @Input() team: ITeam;
  @Input() locations: ILocation[];
  @Output() saveTeam: EventEmitter<ITeam> = new EventEmitter<ITeam>(false);

  public form: FormGroup;
  public weekdays: number[];

  constructor(private applicationService: ApplicationService,
              private fb: FormBuilder) {
    this.weekdays = applicationService.getWeekdays();
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedTrainings: this.initAssignedTrainings()
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: ITeam) => {
      if (this.form.valid) {
        this.saveTeam.emit(changes);
      }
    });
  }

  initAssignedTrainings(): FormArray {
    const formArray = [];
    if (this.team.assignedTrainings) {
      for (let i = 0; i < this.team.assignedTrainings.length; i++) {
        formArray.push(this.initTraining(this.team.assignedTrainings[ i ]));
      }
    }
    return this.fb.array(formArray);
  }

  initTraining(training: ITraining): FormGroup {
    return this.fb.group({
      day: [ training ? training.day : new Date().getDay(), [ Validators.required ] ],
      startTime: [ training ? training.startTime : '', [ Validators.required ] ],
      endTime: [ training ? training.endTime : '', [ Validators.required ] ],
      comment: training ? training.comment : '',
      assignedLocation: [ training ? training.assignedLocation : '', [ Validators.required ] ]
    });
  }

  addTraining(): void {
    const control = this.form.controls[ 'assignedTrainings' ] as FormArray;
    control.push(this.initTraining(null));
  }

  removeTraining(i: number) {
    const control = this.form.controls[ 'assignedTrainings' ] as FormArray;
    control.removeAt(i);
  }

}
