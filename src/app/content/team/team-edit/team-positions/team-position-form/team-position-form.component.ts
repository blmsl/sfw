import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';
import { ICategory } from '../../../../../shared/interfaces/category.interface';

@Component({
  selector: 'team-position-form',
  templateUrl: './team-position-form.component.html'
})
export class TeamPositionFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() members: IMember[];
  @Input() categories: ICategory[];
  @Input() i: number;

  @Output() removePosition: EventEmitter<number> = new EventEmitter<number>(false);

  constructor() {
  }

  ngOnInit() {
  }

}
