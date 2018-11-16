import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                         from '@angular/core';
import { ICategory }      from '../../../../shared/interfaces/category.interface';
import { IMember }        from '../../../../shared/interfaces/member/member.interface';
import { IClub }          from '../../../../shared/interfaces/club/club.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'club-management',
  templateUrl: './club-management.component.html',
  styleUrls: [ 'club-management.component.scss' ]
})
export class ClubManagementComponent implements OnInit {

  @Input() members: IMember[];
  @Input() positions: ICategory[];
  @Input() showLinks: boolean;
  @Output() saveClub: EventEmitter<IClub> = new EventEmitter<IClub>(false);

  public showForm: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  /* removeClubManagementPosition($event: number): void {
   const control = <FormArray>this.form.controls['management']['controls']['positions'];
   control.removeAt($event);
   this.selectedClubManagementPosition = -1;
   } */

}
