import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
}                               from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
}                               from '@angular/forms';
import { IMember }              from '../../../../shared/interfaces/member/member.interface';
import { IOpinion }             from '../../../../shared/interfaces/member/opinion.interface';
import * as firebase            from 'firebase';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'member-edit-other-opinions',
  templateUrl: './member-edit-other-opinions.component.html',
  styleUrls: ['./member-edit-other-opinions.component.scss']
})
export class MemberEditOtherOpinionsComponent implements OnInit {

  @Input() member: IMember;
  @Input() members: IMember[];

  @Output() saveMember: EventEmitter<IMember> = new EventEmitter<IMember>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private cdRef: ChangeDetectorRef,) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      opinions: this.initOpinions()
    });

    this.form.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((changes: IMember) => {
      if (this.form.valid) {
        this.saveMember.emit(changes);
      }
    });
  }

  initOpinions(): FormArray {
    const formArray = [];
    if (this.member.opinions) {
      for (let i = 0; i < this.member.opinions.length; i++) {
        formArray.push(this.initOpinion(this.member.opinions[ i ]));
        // this.setOpinionValidators(i, 'list');
      }
    }
    return this.fb.array(formArray);
  }

  initOpinion(opinion?: IOpinion): FormGroup {
    return this.fb.group({
      type: opinion ? opinion.type : 'list',
      name: this.fb.group({
        firstName: [ opinion ? opinion.name.firstName : '' ],
        lastName: [ opinion ? opinion.name.lastName : '' ]
      }),
      creation: {
        at: opinion && opinion.creation ? opinion.creation.at : new Date(),
        from: opinion && opinion.creation ? opinion.creation.by : '',
      },
      assignedMember: [ opinion ? opinion.assignedMember : '', [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ] ],
      comment: [ opinion ? opinion.comment : '', [ Validators.required ] ]
    });
  }

  setOpinionValidators($event: { i: number, type: string }) {
    const control = <FormArray>this.form.controls[ 'opinions' ][ 'controls' ][ $event.i ];

    if (control.get('type').value === 'insert') {
      control.get('type').setValue('list');
      control.get('name').get('firstName').setValue('');
      control.get('name').get('lastName').setValue('');
      control.get('assignedMember').setValidators(Validators.required);
    }
    else {
      control.get('type').setValue('insert');
      control.get('assignedMember').setValidators([]);
      control.get('assignedMember').setValue('');

      control.get('name').get('firstName').setValidators([ Validators.required, Validators.minLength(3) ]);
      control.get('name').get('lastName').setValidators([ Validators.required, Validators.minLength(5) ]);
    }
    this.cdRef.detectChanges();
  }

  addOpinion(): void {
    const control = this.form.controls[ 'opinions' ] as FormArray;
    control.push(this.initOpinion());
  }

  removeOpinion($event: number): void {
    const control = this.form.controls[ 'opinions' ] as FormArray;
    control.removeAt($event);
  }

}
