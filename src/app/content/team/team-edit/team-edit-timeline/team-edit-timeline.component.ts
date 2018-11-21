import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { ITimeLineEvent } from '../../../../shared/interfaces/time-line-event.interface';

@Component({
  selector: 'team-edit-timeline',
  templateUrl: './team-edit-timeline.component.html',
  styleUrls: ['./team-edit-timeline.component.scss']
})
export class TeamEditTimelineComponent implements OnInit {

  @Input() team: ITeam;
  @Output() saveTeam: EventEmitter<ITeam> = new EventEmitter<ITeam>(false);

  public form: FormGroup;
  public selectedEvent = -1;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedEvents: this.initAssignedEvents()
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

  initAssignedEvents(): FormArray {
    const formArray = [];
    if (this.team.assignedEvents) {
      for (let i = 0; i < this.team.assignedEvents.length; i++) {
        formArray.push(this.initAssignedEvent(this.team.assignedEvents[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initAssignedEvent(event: ITimeLineEvent): FormGroup {
    return this.fb.group({
      title: [event ? event.title : '', [Validators.required, Validators.maxLength(100)]],
      subTitle: [event ? event.subTitle : ''],
      icon: [event ? event.icon : ''],
      color: [event ? event.color : ''],
      assignedMediaItem: [event ? event.assignedMediaItem : ''],
      assignedArticle: [event ? event.assignedArticle : ''],
      startDate: [event ? event.startDate : new Date()],
      endDate: [event ? event.endDate : new Date()]
    });
  }

  addEvent(): void {
    const control = this.form.controls['assignedEvents'] as FormArray;
    control.push(this.initAssignedEvent(null));
    // this.selectedEvent = this.form.controls[ 'assignedEvents' ][ 'controls' ].length - 1;
  }

  editEvent($event: number): void {
    // this.selectedEvent = $event;
    // this.cd.detectChanges();
  }

  saveEvent(): void {
    // this.selectedEvent = -1;
  }

  removeEvent($event: number): void {
    const control = this.form.controls['assignedEvents'] as FormArray;
    control.removeAt($event);
    // this.selectedEvent = -1;
  }

}
