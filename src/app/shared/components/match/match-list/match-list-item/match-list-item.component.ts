import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { IMatch } from '../../../../interfaces/match/match.interface';
import { ICategory } from '../../../../interfaces/category.interface';
import { fadeOutAnimation } from '../../../../animations/fade-out.animations';

@Component({
  selector: 'match-list-item',
  templateUrl: './match-list-item.component.html',
  styleUrls: ['./match-list-item.component.scss'],
  animations: [fadeOutAnimation]
})
export class MatchListItemComponent implements OnInit {

  @Input() match: IMatch;
  @Input() categories: ICategory[];
  @Input() showResultInputs = false;
  @Input() showResult = false;
  @Input() otherEvents: { id: number, title: string }[];

  @HostBinding('@visibilityChanged') visibilityChanged = false;

  public cssClass = '';

  constructor() {
  }

  ngOnInit() {
  }

  setCssClass($event) {
    this.cssClass = 'alert-' + $event;
    if ($event === 'success') {
      this.visibilityChanged = true;
    }
  }

}
