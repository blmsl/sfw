import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';

@Component({
  selector: 'team-positions',
  templateUrl: './team-positions.component.html'
})
export class TeamPositionsComponent {

  @Input() form: FormGroup;
  @Input() members: IMember[];
  @Input() categories: ICategory[];
  @Input() categoryTypes: ICategoryType[];

  @Output() addPosition: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() removePosition: EventEmitter<number> = new EventEmitter<number>(false);

  constructor() {
  }

  deleteFromTeam(memberId: string) {
    let players = this.form.get('assignedPlayers').value;
    const index = players.indexOf(memberId);
    players.splice(index, 1);
    this.form['controls']['assignedPlayers'].patchValue(players);
  }

}
