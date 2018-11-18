import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { ITimeLineEvent } from '../../../../shared/interfaces/time-line-event.interface';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'club-timeline',
  templateUrl: './club-timeline.component.html',
  styleUrls: ['./club-timeline.component.scss']
})
export class ClubTimelineComponent implements OnInit {

  @Input() articles: IArticle[];

  public club: IClub;
  public form: FormGroup;
  public selectedClubTimeLineEvent: number = -1;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => {
      this.club = data.club;
    });

    this.form = this.fb.group({
      timeLine: this.club.timeLine ? this.club.timeLine : []
    });
  }

  initTimeLineEvent(event: ITimeLineEvent): FormGroup {
    return this.fb.group({
      title: [event.title, [Validators.required, Validators.maxLength(100)]],
      subTitle: event.subTitle,
      icon: event.icon,
      color: event.color,
      assignedMediaItem: event.assignedMediaItem,
      assignedArticle: event.assignedArticle,
      startDate: [event.startDate ? new Date(event.startDate.seconds * 1000) : new Date()],
      endDate: [event.endDate ? new Date(event.endDate.seconds * 1000) : null]
    });
  }

  addTimeLineEvent(): void {
    const control = <FormArray>this.form.controls['timeLine'];
    const event: ITimeLineEvent = {
      title: '',
      startDate: {
        nanoseconds: 0,
        seconds: moment().unix()
      }
    };
    const addCtrl = this.initTimeLineEvent(event);
    control.push(addCtrl);
    this.selectedClubTimeLineEvent = this.form.controls['timeLine']['controls'].length - 1;
  }

  editTimeLineEvent($event: number): void {
    this.selectedClubTimeLineEvent = $event;
  }

  saveTimeLineEvent(): void {
    this.selectedClubTimeLineEvent = -1;
  }

  removeTimeLineEvent($event: number): void {
    const control = <FormArray>this.form.controls['timeLine'];
    control.removeAt($event);
    this.selectedClubTimeLineEvent = -1;
  }

  cancel() {
    this.selectedClubTimeLineEvent = -1;
  }

}
