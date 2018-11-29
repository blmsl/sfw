import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { ITimeLineEvent } from '../../../../shared/interfaces/time-line-event.interface';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from '../../../../shared/interfaces/article.interface';

@Component({
  selector: 'team-edit-timeline',
  templateUrl: './team-edit-timeline.component.html',
  styleUrls: ['./team-edit-timeline.component.scss']
})
export class TeamEditTimelineComponent implements OnInit {

  @Input() articles: IArticle[];
  @Output() saveTeam: EventEmitter<ITeam> = new EventEmitter<ITeam>(false);

  public team: ITeam;
  public editEvent: ITimeLineEvent;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: { team: ITeam }) => {
      this.team = data.team;
    });
  }

  saveTimeLineEvent($event: ITimeLineEvent): void {
    this.team.assignedEvents ? this.team.assignedEvents.push($event) : this.team.assignedEvents = [$event];
    this.saveTeam.emit(this.team);
  }

  updateTimeLineEvent($event: ITimeLineEvent): void {
    const idx = this.team.assignedEvents.indexOf(this.editEvent);
    this.team.assignedEvents[idx] = $event;
    this.saveTeam.emit(this.team);
    this.editEvent = null;
  }

  editTimeLineEvent($event: ITimeLineEvent): void {
    this.editEvent = $event;
  }

  deleteTimeLineEvent($event: ITimeLineEvent): void {
    console.log($event);
    this.team.assignedEvents.splice(this.team.assignedEvents.indexOf($event), 1);
    this.saveTeam.emit(this.team);
  }

  cancelEditTimeLineEvent(): void {
    delete this.editEvent;
  }

}
