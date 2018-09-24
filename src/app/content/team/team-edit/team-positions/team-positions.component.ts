import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { ITeamManagement } from '../../../../shared/interfaces/team/team-management.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/internal/operators';

@Component({
  selector: 'team-positions',
  templateUrl: './team-positions.component.html'
})
export class TeamPositionsComponent implements OnInit {

  @Input() team: ITeam;
  @Input() members: IMember[];
  @Input() categories: ICategory[];
  @Input() categoryTypes: ICategoryType[];
  @Output() saveTeam: EventEmitter<ITeam> = new EventEmitter<ITeam>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      assignedPositions: this.initAssignedPositions()
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

  initAssignedPositions(): FormArray {
    const formArray = [];
    if (this.team.assignedPositions) {
      for (let i = 0; i < this.team.assignedPositions.length; i++) {
        formArray.push(this.initPosition(this.team.assignedPositions[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initPosition(position: ITeamManagement): FormGroup {
    return this.fb.group({
      type: [position ? position.type : '', [Validators.required]],
      position: [position ? position.position : '', [Validators.required]],
      assignedMember: [position ? position.assignedMember : '', [Validators.required]]
    });
  }

  removePosition(i: number) {
    const control = this.form.controls['assignedPositions'] as FormArray;
    control.removeAt(i);
  }

  addPosition(): void {
    const control = this.form.controls['assignedPositions'] as FormArray;
    control.push(this.initPosition(null));
  }

}
