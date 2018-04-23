import { Component, Input, OnInit } from '@angular/core';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITimeLineEvent } from '../../../../shared/interfaces/time-line-event.interface';

@Component({
  selector: 'club-detail-history',
  templateUrl: './club-detail-history.component.html',
  styleUrls: ['./club-detail-history.component.scss']
})
export class ClubDetailHistoryComponent implements OnInit {

  @Input() club: IClub;

  public form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      timeLine: this.initClubTimeLine()
    });
  }

  // TimeLine
  initClubTimeLine(): FormArray {
    const formArray = [];
    if (this.club.timeLine) {
      for (let i = 0; i < this.club.timeLine.length; i++) {
        formArray.push(this.initTimeLineEvent(this.club.timeLine[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initTimeLineEvent(event: ITimeLineEvent): FormGroup {
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
