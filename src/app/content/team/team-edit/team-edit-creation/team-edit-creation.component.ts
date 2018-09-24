import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';

@Component({
  selector: 'team-edit-creation',
  templateUrl: './team-edit-creation.component.html',
  styleUrls: ['./team-edit-creation.component.scss']
})
export class TeamEditCreationComponent implements OnInit {

  @Input() team: ITeam;

  constructor() { }

  ngOnInit() {
  }

}
