import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';

@Component({
  selector: 'match-edit-links',
  templateUrl: './match-edit-links.component.html',
  styleUrls: ['./match-edit-links.component.scss']
})
export class MatchEditLinksComponent implements OnInit {

  @Input() match: IMatch;
  @Output() saveMatch: EventEmitter<IMatch> = new EventEmitter<IMatch>(false);

  constructor() { }

  ngOnInit() {
  }

  removeMatchLink(i: number){
    this.match.assignedLinks.splice(i, 1);
    this.saveMatch.emit(this.match);
  }

}
