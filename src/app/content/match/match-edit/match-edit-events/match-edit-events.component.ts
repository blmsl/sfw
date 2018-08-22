import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMatchEvent } from '../../../../shared/interfaces/match/match-event.interface';
import { IMatchEventCategory } from '../../../../shared/interfaces/match/match-event-category.interface';

@Component({
  selector: 'match-edit-events',
  templateUrl: './match-edit-events.component.html',
  styleUrls: ['./match-edit-events.component.scss']
})
export class MatchEditEventsComponent implements OnInit {

  @Input() assignedMatchEvents: IMatchEvent[];
  @Input() eventCategories: IMatchEventCategory[];

  @Output() deleteMatchEvent: EventEmitter<IMatchEvent> = new EventEmitter<IMatchEvent>(false);

  constructor() {
  }

  ngOnInit() {
    console.log(this.assignedMatchEvents);
  }

}
