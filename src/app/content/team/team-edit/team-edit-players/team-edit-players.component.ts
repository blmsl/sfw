import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/internal/operators';
import { IMember } from '../../../../shared/interfaces/member/member.interface';

@Component({
  selector: 'team-edit-players',
  templateUrl: './team-edit-players.component.html',
  styleUrls: ['./team-edit-players.component.scss']
})
export class TeamEditPlayersComponent implements OnInit {

  @Input() team: ITeam;
  @Input() members: IMember[];
  @Output() saveTeam: EventEmitter<ITeam> = new EventEmitter<ITeam>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedPlayers: [this.team.assignedPlayers]
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: ITeam) => {
      if (this.form.valid) {
        this.saveTeam.emit(changes);
      }
    });
  }

  deleteFromTeam(memberId: string) {
    let players = this.form.get('assignedPlayers').value;
    const index = players.indexOf(memberId);
    players.splice(index, 1);
    this.form['controls']['assignedPlayers'].patchValue(players);
  }

}
