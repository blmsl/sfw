import {
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import { IMatchEventCategory } from '../../../../shared/interfaces/match/match-event-category.interface';
import { IMatchEvent } from "src/app/shared/interfaces/match/match-event.interface";

@Component({
  selector: 'match-edit-events',
  templateUrl: './match-edit-events.component.html',
  styleUrls: [ './match-edit-events.component.scss' ]
})
export class MatchEditEventsComponent implements OnInit {

  @Input() matchEvents: IMatchEvent[];
  @Input() eventCategories: IMatchEventCategory[];
  @Output() deleteMatchEvent: EventEmitter<number> = new EventEmitter<number>(false);

  orderedMatchEvents: any[];

  ngOnInit() {
    this.orderMatchEvents();
  }

  changeOrder(sourceIndex: number, destinationIndex: number) {
    // Swap Variables and order again
    [this.matchEvents[sourceIndex].ordering, this.matchEvents[destinationIndex].ordering] = [this.matchEvents[destinationIndex].ordering, this.matchEvents[sourceIndex].ordering];
    this.orderMatchEvents();
  }

  private orderMatchEvents() {
    this.orderedMatchEvents = this.matchEvents.sort((a,b) => {
      return (a.ordering > b.ordering) ? 1 : 0;
    });
  }
}
