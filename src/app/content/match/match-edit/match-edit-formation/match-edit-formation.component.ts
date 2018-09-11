import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                                from '@angular/core';
import { IMember }               from '../../../../shared/interfaces/member/member.interface';
import { IFormation }            from '../../../../shared/interfaces/match/formation.interface';
import { IMatch }                from '../../../../shared/interfaces/match/match.interface';
import { MatchFormationService } from '../../../../shared/services/match/match-formation.service';
import {
  FormBuilder,
  FormGroup
}                                from '@angular/forms';
import { distinctUntilChanged }  from 'rxjs/internal/operators';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
}                                from '@angular/cdk/drag-drop';

@Component({
  selector: 'match-edit-formation',
  templateUrl: './match-edit-formation.component.html',
  styleUrls: [ './match-edit-formation.component.scss' ]
})
export class MatchEditFormationComponent implements OnInit {

  @Input() assignedTeamPlayers: IMember[];
  @Input() match: IMatch;
  @Output() saveMatch: EventEmitter<IMatch> = new EventEmitter<IMatch>(false);

  public tacticalFormations: IFormation[];
  public form: FormGroup;

  items = [ 'Zero', 'One', 'Two', 'Three' ];
  items2 = [ 'Test', 'asd', 'Tdfs', 'Tmmndr' ];

  constructor(private matchFormationService: MatchFormationService,
              private fb: FormBuilder) {
    this.tacticalFormations = matchFormationService.getFormations();
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedFormation: this.match.assignedFormation
    });

    if (!this.match.assignedSubstitutes) {
      this.match.assignedSubstitutes = [];
    }

    this.form.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((changes: IMatch) => {
      if (this.form.valid) {
        this.saveMatch.emit(changes);
      }
    });
  }

  addToList(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log(event);
      console.log('transfer');
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getMaxSubstitutes(assignedFormationTitle: string, substitutionList: string[]) {
    const substitutionListLength = substitutionList ? substitutionList.length : 0;
    const maxSubstitutes = this.tacticalFormations.filter((formation: IFormation) => {
      return formation.title === assignedFormationTitle;
    });
    return maxSubstitutes.length === 0
      ? []
      : new Array(maxSubstitutes[ 0 ].maxSubstitutes - substitutionListLength).fill(0).map((_, i) => i);
  }

}
