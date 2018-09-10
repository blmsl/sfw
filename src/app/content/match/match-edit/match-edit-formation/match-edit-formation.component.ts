import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { IMember }               from '../../../../shared/interfaces/member/member.interface';
import { MatSelectChange }       from '@angular/material';
import { IFormation }            from '../../../../shared/interfaces/match/formation.interface';
import { IMatch }                from '../../../../shared/interfaces/match/match.interface';
import { MatchFormationService } from '../../../../shared/services/match/match-formation.service';
import {
  FormBuilder,
  FormGroup
}                                from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/internal/operators';

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
  public assignedFormation: IFormation;
  public form: FormGroup;

  constructor(private matchFormationService: MatchFormationService,
              private fb: FormBuilder) {
    this.tacticalFormations = matchFormationService.getFormations();
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedFormation: this.match.assignedFormation
    });

    this.form.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((changes: IMatch) => {
      if (this.form.valid) {
        this.saveMatch.emit(changes);
      }
    });
  }

}
