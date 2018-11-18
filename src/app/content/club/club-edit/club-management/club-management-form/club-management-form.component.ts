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
import { IMember } from '../../../../../shared/interfaces/member/member.interface';
import { ICategory } from '../../../../../shared/interfaces/category.interface';
import { IClub } from '../../../../../shared/interfaces/club/club.interface';
import { ActivatedRoute } from '@angular/router';
import { IClubManagement } from '../../../../../shared/interfaces/club/club-management.interface';

@Component({
  selector: 'club-management-form',
  templateUrl: './club-management-form.component.html'
})
export class ClubManagementFormComponent implements OnInit {

  @Input() club: IClub;
  @Input() positions: ICategory[];
  @Input() members: IMember[];
  @Input() selectedPosition: IClubManagement;

  @Output() saveClub: EventEmitter<IClub> = new EventEmitter<IClub>(false);
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>(false);

  public form: FormGroup;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder) {
  }


  ngOnInit() {
    this.route.data.subscribe((data: { club: IClub }) => {
      this.club = data.club;
    });

    if (this.selectedPosition) {
      console.log(this.selectedPosition.startDate);
    }

    this.form = this.fb.group({
      assignedMember: [this.selectedPosition ? this.selectedPosition.assignedMember : '', [Validators.required]],
      assignedPosition: [this.selectedPosition ? this.selectedPosition.assignedPosition : '', [Validators.required]],
      startDate: [this.selectedPosition ? new Date(this.selectedPosition.startDate.seconds * 1000) : new Date(), [Validators.required]],
      endDate: [this.selectedPosition ? this.selectedPosition.endDate : '']
    });
  }

  cancelForm() {
    this.form.reset();
    this.cancel.emit();
  }

  save() {
    if (this.club && this.club.positions) {
      this.club.positions.push(this.form.value);
    } else {
      this.club.positions = [this.form.value];
    }
    this.saveClub.emit(this.club);
    this.cancel.emit();
  }

  /* initClubManagementPositions(): FormArray {
   const formArray = [];
   if (this.club.management && this.club.management.positions) {
   for (let i = 0; i < this.club.management.positions.length; i++) {
   formArray.push(this.initClubManagementPosition(this.club.management.positions[ i ]));
   }
   }
   return this.fb.array(formArray);
   }

   initClubManagementPosition(position: IClubManagement): FormGroup {
   return this.fb.group({
   assignedMember: [ position ? position.assignedMember : null, [ Validators.required ] ],
   assignedPosition: [ position ? position.assignedPosition : null, [ Validators.required ] ],
   startDate: [ position ? position.startDate : new Date(), [ Validators.required ] ],
   endDate: [ position ? position.endDate : '' ]
   });
   }

   addClubManagementPosition(): void {
   const control = <FormArray>this.form.controls[ 'management' ][ 'controls' ][ 'positions' ];
   const position: IClubManagement = {
   assignedMember: null,
   assignedPosition: null,
   startDate: new Date()
   };
   const addCtrl = this.initClubManagementPosition(position);
   control.push(addCtrl);
   // this.selectedClubManagementPosition =
   // this.form.controls['management']['controls']['positions']['controls'].length - 1;
   }

   cancelClubManagementPosition(): void {
   console.log('cancel');
   }

   editClubManagementPosition($event: number): void {
   console.log($event);
   // const control = <FormArray>this.form.controls['management']['controls']['positions'];
   // console.log(control.controls.indexOf($event));
   // this.selectedClubManagementPosition = $event;
   // this.selectedClubManagementPosition = $event;
   }

   saveClubManagementPosition(): void {
   // this.selectedClubManagementPosition = -1;
   } */

}
