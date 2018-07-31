import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { IClubManagement } from "../../../../shared/interfaces/club/club-management.interface";

@Component({
  selector: 'club-management',
  templateUrl: './club-management.component.html',
  styleUrls: ['club-management.component.scss']
})
export class ClubManagementComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() club: IClub;
  @Input() selectedClubManagementPosition: number;
  @Input() members: IMember[];
  @Input() positions: ICategory[];
  @Input() showLinks: boolean;

  @Output() add: EventEmitter<void> = new EventEmitter<void>(false);
  @Output() save: EventEmitter<void> = new EventEmitter<void>(false);

  @Output() delete: EventEmitter<IClubManagement> = new EventEmitter<IClubManagement>(false);
  @Output() edit: EventEmitter<IClubManagement> = new EventEmitter<IClubManagement>(false);

  constructor() {
  }

  ngOnInit() {
  }

}
