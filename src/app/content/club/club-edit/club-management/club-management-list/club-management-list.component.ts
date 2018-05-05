import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategory } from '../../../../../shared/interfaces/category.interface';
import { IMember } from '../../../../../shared/interfaces/member/member.interface';
import { FormArray, FormGroup } from '@angular/forms';
import { IClubManagement } from '../../../../../shared/interfaces/club/club-management.interface';
import { IClub } from '../../../../../shared/interfaces/club/club.interface';

@Component({
  selector: 'club-management-list',
  templateUrl: './club-management-list.component.html',
  styleUrls: ['./club-management-list.component.scss']
})
export class ClubManagementListComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() club: IClub;
  @Input() selectedClubManagementPosition: number;
  @Input() members: IMember[];
  @Input() positions: ICategory[];

  @Input() showLinks: boolean;

  @Output() add: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() delete: EventEmitter<IClubManagement> = new EventEmitter<IClubManagement>(false);
  @Output() edit: EventEmitter<IClubManagement> = new EventEmitter<IClubManagement>(false);

  public step = -1;

  constructor() {
  }

  ngOnInit() {
  }

  setStep(i: number) {
    this.step = i;
  }

  deleteManagementPosition(position: any) {
    const control = <FormArray>this.form.controls['management']['controls']['positions'];
    control.removeAt(position);

    console.log(this.form.controls['management']['controls']['positions']['controls']);
    // console.log(position);
    // console.log(this.club.management.positions.indexOf(position));
  }

}
