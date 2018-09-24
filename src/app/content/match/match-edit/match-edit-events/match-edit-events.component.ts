import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { IMatchEventCategory } from '../../../../shared/interfaces/match/match-event-category.interface';
import { IMatchEvent } from 'src/app/shared/interfaces/match/match-event.interface';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';

@Component({
  selector: 'match-edit-events',
  templateUrl: './match-edit-events.component.html',
  styleUrls: ['./match-edit-events.component.scss']
})
export class MatchEditEventsComponent implements OnInit, OnChanges {

  @Input() match: IMatch;
  @Input() eventCategories: IMatchEventCategory[];
  @Output() saveMatch: EventEmitter<IMatch> = new EventEmitter<IMatch>(false);

  orderedMatchEvents: any[];

  ngOnInit() {
    this.orderMatchEvents();
  }

  ngOnChanges() {
    this.orderMatchEvents();
  }

  changeOrder($event: { sourceIndex: number, destinationIndex: number }) {
    [this.match.assignedMatchEvents[$event.sourceIndex].ordering, this.match.assignedMatchEvents[$event.destinationIndex].ordering] = [this.match.assignedMatchEvents[$event.destinationIndex].ordering, this.match.assignedMatchEvents[$event.sourceIndex].ordering];
    this.orderMatchEvents();
    this.saveMatch.emit(this.match);
  }

  deleteMatchEvent(matchEvent: IMatchEvent) {
    this.match.assignedMatchEvents.splice(this.match.assignedMatchEvents.indexOf(matchEvent), 1);
    this.saveMatch.emit(this.match);
  }

  private orderMatchEvents() {
    if (this.match.assignedMatchEvents) {
      this.orderedMatchEvents = this.match.assignedMatchEvents.sort((a, b) => {
        return (a.ordering > b.ordering) ? 1 : 0;
      });
    }
  }
}
