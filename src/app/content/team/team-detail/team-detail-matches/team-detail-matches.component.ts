import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { IMatch } from '../../../../shared/interfaces/match.interface';

@Component({
  selector: 'team-detail-matches',
  templateUrl: './team-detail-matches.component.html',
  styleUrls: ['./team-detail-matches.component.scss']
})
export class TeamDetailMatchesComponent implements OnInit {

  @Input() team: ITeam;
  @Input() categories: ICategory[];
  @Input() matches: IMatch[];
  @Input() events: {
    id: number,
    title: string
  }[];

  constructor() { }

  ngOnInit() {
  }

}
