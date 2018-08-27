import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';

@Component({
  selector: 'team-detail-matches',
  templateUrl: './team-detail-matches.component.html',
  styleUrls: ['./team-detail-matches.component.scss']
})
export class TeamDetailMatchesComponent implements OnInit {

  @Input() team: ITeam;

  @Input() assignedTeamCategories: ICategory[];
  @Input() assignedMatches: IMatch[];

  @Input() events: {
    id: number,
    title: string
  }[];

  constructor() { }

  ngOnInit() {
  }

}
