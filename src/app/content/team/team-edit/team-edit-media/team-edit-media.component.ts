import {
  Component,
  Input,
  OnInit
}                from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';

@Component({
  selector: 'team-edit-media',
  templateUrl: './team-edit-media.component.html',
  styleUrls: ['./team-edit-media.component.scss']
})
export class TeamEditMediaComponent implements OnInit {

  @Input() team: ITeam;

  constructor() { }

  ngOnInit() {
  }

}
