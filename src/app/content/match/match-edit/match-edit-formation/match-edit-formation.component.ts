import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { IFormation } from '../../../../shared/interfaces/match/formation.interface';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import { MatchFormationService } from '../../../../shared/services/match/match-formation.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, first } from 'rxjs/internal/operators';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ICoord } from '../../../../shared/interfaces/match/coord.interface';
import { MatSelectChange } from '@angular/material';
import { MemberService } from '../../../../shared/services/member/member.service';
import { number } from 'ng2-validation/dist/number';

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

  public thirty: IMember[][];
  public playerPositions: ICoord[];
  public coordinates = [];

  items = ['Zero', 'One', 'Two', 'Three'];
  playerList = [];

  constructor(private matchFormationService: MatchFormationService,
              private memberService: MemberService,
              private fb: FormBuilder) {
    this.tacticalFormations = matchFormationService.getFormations();
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedFormation: this.match.assignedFormation
    });

    this.initializeFieldPositions();

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
    this.initializeFieldPositions();
  }

  setPlayerPositions(formationTitle: string) {

    const formation = this.tacticalFormations.find((formation: IFormation) => {
      return formation.title === formationTitle;
    });
    this.playerPositions = this.matchFormationService.getFormationPositions(formation);
    console.log(this.playerPositions);
  }

  initializeFieldPositions() {
    this.thirty = [];

    for (const i of [...Array(6)]) {
      const row: IMember[] = [];
      for (const j of [...Array(5)]){
        this.memberService.setNewMember().pipe(first()).subscribe((member: IMember) =>
          row.push(member));
      }
      this.thirty.push(row);
    }
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
    if (event.previousContainer.id !== event.container.id) {
      if (['0', '1', '2', '3', '4', '5'].includes(event.container.id)) {
        const x = Number.parseInt(event.container.id, 10);
        this.thirty = this.thirty.map((element: IMember[], index: number) => {
          if (index === x) {
            return element.map((member: IMember, memberIndex: number) => {
              if (memberIndex === event.currentIndex) {
                const position: ICoord = { x, y: memberIndex } ;
                for (const p of this.playerPositions) {
                  if (p.x === position.x && Math.abs(p.y - 4) === position.y) {
                    return event.item.data;
                  }
                }
                return member;
              }
              return member;
            });
          }
          return element;
        });
      }

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
