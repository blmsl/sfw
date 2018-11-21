import { Component, Input, OnInit } from '@angular/core';
import { IMatchEvent } from '../../../../shared/interfaces/match/match-event.interface';
import { IMatchEventCategory } from '../../../../shared/interfaces/match/match-event-category.interface';

@Component({
  selector: 'match-detail-events',
  templateUrl: './match-detail-events.component.html',
  styleUrls: ['./match-detail-events.component.scss']
})
export class MatchDetailEventsComponent implements OnInit {

  @Input() matchEvents: IMatchEvent[];
  @Input() eventCategories: IMatchEventCategory[];

  public stacked = false;

  constructor() {
  }

  ngOnInit() {
  }

}
