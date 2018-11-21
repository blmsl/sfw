import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategory } from '../../../../shared/interfaces/category.interface';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import { IClub } from '../../../../shared/interfaces/club/club.interface';
import { IClubManagement } from '../../../../shared/interfaces/club/club-management.interface';

@Component({
  selector: 'club-management',
  templateUrl: './club-management.component.html',
  styleUrls: ['club-management.component.scss']
})
export class ClubManagementComponent implements OnInit {

  @Input() members: IMember[];
  @Input() positions: ICategory[];
  @Input() showLinks: boolean;
  @Output() saveClub: EventEmitter<IClub> = new EventEmitter<IClub>(false);

  public showForm = false;
  public selectedPosition: IClubManagement;

  constructor() {
  }

  ngOnInit() {
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  editManagementPosition($event: IClubManagement) {
    this.showForm = true;
    this.selectedPosition = $event;
  }

  cancel() {
    this.selectedPosition = null;
    this.toggleForm();
  }

}
