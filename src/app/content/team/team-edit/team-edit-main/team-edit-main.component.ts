import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ICategoryType } from '../../../../shared/interfaces/category-type.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ISeason } from '../../../../shared/interfaces/season.interface';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/internal/operators';

@Component({
  selector: 'team-edit-main',
  templateUrl: './team-edit-main.component.html',
  styleUrls: ['./team-edit-main.component.scss']
})
export class TeamEditMainComponent implements OnInit {

  @Input() team: ITeam;
  @Input() categoryTypes: ICategoryType[];
  @Input() categories: ICategory[];
  @Input() seasons: ISeason[];
  @Input() clubs: IClub[];
  @Output() saveTeam: EventEmitter<ITeam> = new EventEmitter<ITeam>(false);

  public form: FormGroup;
  public titleMaxLength: number = 50;
  public shortTitleMaxLength: number = 25;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    this.form = this.fb.group({
      title: [this.team.title, [Validators.required, Validators.minLength(5), Validators.maxLength(this.titleMaxLength)]],
      subTitle: this.team.subTitle,
      assignedTeamCategories: [this.team.assignedTeamCategories, [Validators.required]],
      externalLink: this.team.externalTeamLink,
      assignedClub: [this.team.assignedClub, [Validators.required]],
      assignedSeason: this.team.assignedSeason,
      isOfficialTeam: this.team.isOfficialTeam,
      isMainTeam: this.team.isMainTeam
    });

    if (this.team.isImported) {
      this.form.disable();
      this.form.get('isMainTeam').enable();
    }

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: ITeam) => {
      if (this.form.valid) {
        this.saveTeam.emit(changes);
      }
    });
  }

}
