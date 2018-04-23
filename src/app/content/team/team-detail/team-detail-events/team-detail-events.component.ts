import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { ITimeLineEvent } from '../../../../shared/interfaces/time-line-event.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'team-detail-events',
  templateUrl: './team-detail-events.component.html',
  styleUrls: ['./team-detail-events.component.scss']
})
export class TeamDetailEventsComponent implements OnInit {

  @Input() team: ITeam;

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      timeLine: this.initEvents()
    });
  }

  // TimeLine
  initEvents(): FormArray {
    const formArray = [];
    if (this.team.assignedEvents) {
      for (let i = 0; i < this.team.assignedEvents.length; i++) {
        formArray.push(this.initEvent(this.team.assignedEvents[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initEvent(event: ITimeLineEvent): FormGroup {
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

}
