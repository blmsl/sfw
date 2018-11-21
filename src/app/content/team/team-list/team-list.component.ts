import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITeam } from '../../../shared/interfaces/team/team.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICategory } from '../../../shared/interfaces/category.interface';
import { ISeason } from '../../../shared/interfaces/season.interface';
import { IClub } from '../../../shared/interfaces/club/club.interface';

@Component({
  selector: 'team-list',
  templateUrl: 'team-list.component.html'
})

export class TeamListComponent implements OnInit {

  @Input() teams: ITeam[];
  @Input() categories: ICategory[];
  @Input() seasons: ISeason[];
  @Input() clubs: IClub[];

  @Output() remove: EventEmitter<ITeam> = new EventEmitter<ITeam>(false);

  public form: FormGroup;
  public itemsPerPageOptions = [5, 10, 25, 50, 100];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      searchFor: '',
      limit: 10,
      assignedCategory: '',
      assignedSeason: ''
    });
  }

  removeTeam(team: ITeam) {
    this.remove.emit(team);
    this.form.controls['searchFor'].reset();
  }

}
