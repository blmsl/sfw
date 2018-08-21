import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';

@Component({
  selector: 'location-detail-matches',
  templateUrl: './location-detail-matches.component.html',
  styleUrls: ['./location-detail-matches.component.scss']
})
export class LocationDetailMatchesComponent implements OnInit {

  @Input() assignedMatches: IMatch[];

  constructor() { }

  ngOnInit() {
  }

}
