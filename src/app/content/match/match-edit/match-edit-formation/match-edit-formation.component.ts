import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { IFormation } from '../../../../shared/interfaces/match/formation.interface';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import { MatchFormationService } from '../../../../shared/services/match/match-formation.service';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/internal/operators';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { ICoord } from '../../../../shared/interfaces/match/coord.interface';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'match-edit-formation',
  templateUrl: './match-edit-formation.component.html',
  styleUrls: ['./match-edit-formation.component.scss']
})
export class MatchEditFormationComponent implements OnInit {

  @Input() assignedTeamPlayers: IMember[];
  @Input() match: IMatch;
  @Output() saveMatch: EventEmitter<IMatch> = new EventEmitter<IMatch>(false);

  public tacticalFormations: IFormation[];
  public form: FormGroup;

  public thirty: number[];
  public playerPositions: ICoord[];
  public coordinates = [];

  items = ['Zero', 'One', 'Two', 'Three'];
  playerList = [];

  constructor(private matchFormationService: MatchFormationService,
    private fb: FormBuilder) {
    this.tacticalFormations = matchFormationService.getFormations();
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedFormation: this.match.assignedFormation
    });

    this.thirty = new Array(30).fill(0).map((_, i) => i);

    if (this.match.assignedFormation) {
      this.setPlayerPositions(this.match.assignedFormation);
    }

    this.form.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((changes: IMatch) => {
      if (this.form.valid) {
        this.saveMatch.emit(changes);
      }
    });
  }

  changeFormation($event: MatSelectChange) {
    this.setPlayerPositions($event.value);
  }

  setPlayerPositions(formationTitle: string) {

    const formation = this.tacticalFormations.filter((formation: IFormation) => {
      return formation.title === formationTitle;
    });
    this.playerPositions = this.matchFormationService.getFormationPositions(formation[0]);
  }

  getCoordinates(i): ICoord {
    if (this.coordinates[i]) {
      return this.coordinates[i];
    }
    let coords: ICoord = {
      x: i % 6,
      y: Math.floor(i / 6)
    };
    return this.coordinates[i] = coords;
  }

  addToList(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log(event);
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

  /*
   getMaxSubstitutes(assignedFormationTitle: string, substitutionList: string[]) {
   const substitutionListLength = substitutionList ? substitutionList.length : 0;
   const maxSubstitutes = this.tacticalFormations.filter((formation: IFormation) => {
   return formation.title === assignedFormationTitle;
   });
   return maxSubstitutes.length === 0
   ? []
   : new Array(maxSubstitutes[ 0 ].maxSubstitutes - substitutionListLength).fill(0).map((_, i) => i);
   } */

}
