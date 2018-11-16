import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { IMember } from '../../../../shared/interfaces/member/member.interface';
import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { IProfile } from '../../../../shared/interfaces/member/profile.interface';

@Component({
  selector: 'member-edit-profile',
  templateUrl: './member-edit-profile.component.html',
  styleUrls: ['./member-edit-profile.component.scss']
})
export class MemberEditProfileComponent implements OnInit {

  @Input() member: IMember;

  @Output() saveMember: EventEmitter<IMember> = new EventEmitter<IMember>(false);

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      profile: this.initProfile()
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

  initProfile(): FormArray {
    const formArray = [];
    if (this.member.profile) {
      for (let i = 0; i < this.member.profile.length; i++) {
        formArray.push(this.initProfileEntry(this.member.profile[i]));
      }
    }
    return this.fb.array(formArray);
  }

  initProfileEntry(profile: IProfile): FormGroup {
    return this.fb.group({
      entry: [profile ? profile.entry : '', [Validators.required, Validators.maxLength(100)]],
      value: [profile ? profile.value : '', [Validators.required, Validators.maxLength(100)]]
    });
  }

  addProfileEntry(): void {
    const control = this.form.controls['profile'] as FormArray;
    const profile: IProfile = {
      entry: '',
      value: ''
    };
    control.push(this.initProfileEntry(profile));
  }

  removeProfileEntry($event: number): void {
    const control = this.form.controls['profile'] as FormArray;
    control.removeAt($event);
  }
}
