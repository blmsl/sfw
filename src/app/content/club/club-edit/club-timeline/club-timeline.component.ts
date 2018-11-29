import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IArticle } from '../../../../shared/interfaces/article.interface';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { ITimeLineEvent } from '../../../../shared/interfaces/time-line-event.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'club-timeline',
  templateUrl: './club-timeline.component.html',
  styleUrls: ['./club-timeline.component.scss']
})
export class ClubTimelineComponent implements OnInit {

  @Input() articles: IArticle[];
  @Output() saveClub: EventEmitter<IClub> = new EventEmitter<IClub>(false);

  public club: IClub;
  public form: FormGroup;
  public editEvent: ITimeLineEvent;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => {
      this.club = data.club;
    });
  }

  saveTimeLineEvent($event: ITimeLineEvent): void {
    this.club.timeLine ? this.club.timeLine.push($event) : this.club.timeLine = [$event];
    this.saveClub.emit(this.club);
  }

  updateTimeLineEvent($event: ITimeLineEvent): void {
    const idx = this.club.timeLine.indexOf(this.editEvent);
    this.club.timeLine[idx] = $event;
    this.saveClub.emit(this.club);
    this.editEvent = null;
  }

  editTimeLineEvent($event: ITimeLineEvent): void {
    this.editEvent = $event;
  }

  deleteTimeLineEvent($event: ITimeLineEvent): void {
    console.log($event);
    this.club.timeLine.splice(this.club.timeLine.indexOf($event), 1);
    this.saveClub.emit(this.club);
  }

  cancelEditTimeLineEvent(): void {
    delete this.editEvent;
  }
}
