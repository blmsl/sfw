import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';
import { ICategory } from '../../../../../shared/interfaces/category.interface';

@Component({
  selector: 'club-management-form',
  templateUrl: './club-management-form.component.html'
})
export class ClubManagementFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() selectedClubManagementPosition: number;
  @Input() positions: ICategory[];
  @Input() members: IMember[];

  @Output() delete: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() save: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor() {
  }

  ngOnInit() {
  }

}
