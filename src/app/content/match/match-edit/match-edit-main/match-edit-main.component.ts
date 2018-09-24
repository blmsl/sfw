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
import { ILocation } from '../../../../shared/interfaces/location/location.interface';
import { ITeam } from '../../../../shared/interfaces/team/team.interface';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { ISeason } from '../../../../shared/interfaces/season.interface';
import { IMatch } from '../../../../shared/interfaces/match/match.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/internal/operators';

@Component({
  selector: 'match-edit-main',
  templateUrl: './match-edit-main.component.html',
  styleUrls: ['./match-edit-main.component.scss']
})
export class MatchEditMainComponent implements OnInit {

  @Input() match: IMatch;
  @Input() locations: ILocation[];
  @Input() teams: ITeam[];
  @Input() categories: ICategory[];
  @Input() seasons: ISeason[];
  @Output() saveMatch: EventEmitter<IMatch> = new EventEmitter<IMatch>(false);

  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.match.title, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      matchLink: this.match.matchLink,
      matchType: [this.match.matchType, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      assignedLocation: [this.match.assignedLocation, [Validators.required]],
      assignedTeam: [this.match.assignedTeam, [Validators.required]],
      isHomeTeam: this.match.isHomeTeam,
      isImported: this.match.isImported,
      isOfficialMatch: this.match.isOfficialMatch,
      matchEndDate: this.match.matchEndDate ? this.match.matchEndDate.toDate() : null,
      matchStartDate: this.match.matchStartDate ? this.match.matchStartDate.toDate() : null,
      assignedCategories: [this.match.assignedCategories, [Validators.required]],
      homeTeam: this.initTeam(this.match.homeTeam),
      guestTeam: this.initTeam(this.match.guestTeam),


      // creation: this.initCreation(),
      /*publication: this.initPublication(this.match.publication),
      result: this.initResult(this.match.result),
      assignedFormation: this.match.assignedFormation,
      assignedPlayers: this.initAssignedPlayers(this.match.startingEleven),
      assignedSubstitutes: this.initAssignedSubstitutes(this.match.assignedSubstitutes),
      assignedMatchEvents: this.initMatchEvents(this.match.assignedMatchEvents) */
    });

    if (this.match.isImported) {
      this.form.get('assignedCategories').disable();
      this.form.get('assignedLocation').disable();
      this.form.get('assignedTeam').disable();
      this.form.get('guestTeam').disable();
      this.form.get('homeTeam').disable();
      this.form.get('isHomeTeam').disable();
      this.form.get('isImported').disable();
      this.form.get('isOfficialMatch').disable();
      this.form.get('matchEndDate').disable();
      this.form.get('matchLink').disable();
      this.form.get('matchStartDate').disable();
      this.form.get('matchType').disable();
      this.form.get('title').disable();
    }

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IMatch) => {
      if (this.form.valid) {
        this.saveMatch.emit(changes);
      }
    });
  }

  initTeam(data: {
    externalTeamLink?: string,
    logoURL?: string,
    title: string
  }): FormGroup {
    return this.fb.group({
      externalTeamLink: data.externalTeamLink ? data.externalTeamLink : '',
      logoURL: data.logoURL ? data.logoURL : '',
      title: data.title
    });
  }

}
